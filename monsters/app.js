new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    turnLog: [],
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
        text: `Player tickles Monster for ${damage} damage`,
      })
      if (this.checkWin()) return
      this.monsterAttack()
    },
    specialAttack: function() {
      const damage = this.calculateDamage(5, 15)
      this.monsterHealth -= this.turnLog.unshift({
        text: `Player crits the monster for ${damage} damage`,
      })
      if (this.checkWin()) return
      this.monsterAttack()
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 20
        this.turnLog.unshift({
          text: 'Player healed for 20 HP',
        })
      } else {
        this.playerHealth = 100
        this.turnLog.unshift({
          text: 'Player healed to full HP',
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
        text: `Monster smashes Player for ${damage} damage`,
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
