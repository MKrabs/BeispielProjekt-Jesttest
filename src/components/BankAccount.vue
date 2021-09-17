<template>
  <div id="Bank">
    <h2>
      {{ User }}'s Balance: {{ Math.floor(balance) }}
      <span v-if="showBigStacks()"> !!</span>
    </h2>
    <button
      id="make"
      style="margin-bottom: 2em; padding: 8px"
      @click="addMoney()"
    >
      MAKE
    </button>
    <div class="table">
      <table>
        <tr>
          <th>Description</th>
          <th>Force</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td>Click Force:</td>
          <td>
            +<b>{{ intake }}</b>
          </td>
          <td>
            <button id="intake" @click="increaseIntake()">{{ cost }}€</button>
          </td>
        </tr>
        <tr>
          <td>Double your Bank</td>
          <td>x2</td>
          <td>
            <button id="double" @click="doubleMoney()">CLICK HERE</button>
          </td>
        </tr>
        <tr>
          <td>Buy an autoclicker</td>
          <td>+{{ intakepersecond }}€/s</td>
          <td>
            <button id="autoclicker" @click="intakePerSecond()">
              {{ this.intakepersecond * 2 + 50 }}€
            </button>
          </td>
        </tr>
        <tr>
          <td>to be added</td>
          <td>later on</td>
          <td>...</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bank",
  props: {
    User: String,
  },
  data() {
    return {
      balance: 0,
      intake: 1,
      cost: 1,
      intakepersecond: 0,
    };
  },
  mounted() {
    window.setInterval(() => {
      this.balance += this.intakepersecond;
    }, 1000);
  },
  methods: {
    addMoney() {
      this.balance = +this.balance + +this.intake;
    },
    doubleMoney() {
      this.balance *= 2;
    },
    increaseIntake() {
      if (this.balance >= this.cost) {
        this.balance -= this.cost++;
        this.intake++;
      }
    },
    showBigStacks() {
      return +this.balance > 10000;
    },
    intakePerSecond() {
      if (this.balance >= this.intakepersecond * 2 + 50) {
        this.balance -= this.intakepersecond * 2 + 50;
        this.intakepersecond += 10;
      }
    },
    transfer(amount, account) {
      this.$emit("uberweisung", [amount, account]);
    },
  },
};
</script>

<style scoped>
table {
  margin: auto;
}

table td:first-of-type {
  text-align: left;
  width: 400px;
}

table td:nth-of-type(2) {
  width: 100px;
}

button {
  border: none;
  width: 100%;
  height: 38px;
}
</style>
