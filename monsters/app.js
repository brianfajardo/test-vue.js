new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
  },
  methods: {
    initGame: function() {
      this.gameStarted = true
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    attack: function() {
      this.monsterHealth -= this.calculateDamage(3, 10)
      if (this.checkWin()) return
      this.monsterAttack()
    },
    specialAttack: function() {
      this.monsterHealth -= this.calculateDamage(5, 15)
      if (this.checkWin()) return
      this.monsterAttack()
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 20
      } else {
        this.playerHealth = 100
      }
      this.monsterAttack()
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    monsterAttack: function() {
      this.playerHealth -= this.calculateDamage(10, 16)
      this.checkWin()
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You killed the monster. Victory!')) {
          this.initGame()
        } else {
          this.gameStarted = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You have been defeated. Try again.')) {
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
