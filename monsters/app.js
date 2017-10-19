new Vue({
  el: '#app',
  data: {
    username: '',
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    turnLog: [],
  },
  beforeMount: function() {
    const textPrompt = prompt(
      "You've been summoned to battle a monster. What is your fantasy name?"
    )
    if (textPrompt.trim() === '') {
      this.username = 'Player'
    } else {
      this.username = textPrompt
    }
  },
  methods: {
    initGame: function() {
      this.gameStarted = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turnLog = []
    },
    attack: function() {
      const damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage
      this.turnLog.unshift({
        text: `${this.username} tickles Monster for ${damage} damage`,
        isPlayerTurn: true,
      })
      if (this.checkWin()) return
      this.monsterAttack()
    },
    specialAttack: function() {
      const damage = this.calculateDamage(5, 15)
      this.monsterHealth -= this.turnLog.unshift({
        text: `${this.username} crits the monster for ${damage} damage`,
        isPlayerTurn: true,
      })
      if (this.checkWin()) return
      this.monsterAttack()
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 20
        this.turnLog.unshift({
          text: `${this.username}  healed for 20 HP`,
          isHealing: true,
        })
      } else {
        this.playerHealth = 100
        this.turnLog.unshift({
          text: `${this.username} healed to full HP`,
          isHealing: true,
        })
      }
      this.monsterAttack()
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    monsterAttack: function() {
      const damage = this.calculateDamage(10, 16)
      this.playerHealth -= damage
      this.turnLog.unshift({
        text: `Monster smashes ${this.username} for ${damage} damage`,
        isPlayerTurn: false,
      })
      this.checkWin()
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You killed the monster. VICTORY!')) {
          this.initGame()
        } else {
          this.gameStarted = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You have been defeated. Try again?')) {
          this.initGame()
        } else {
          this.gameStarted = false
        }
        return true
      }
      return false
    },
  },
})
