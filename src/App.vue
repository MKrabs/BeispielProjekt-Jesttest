<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/BasicTests">Jesting</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

table {
  margin: auto;
}

table th {
  text-align: left;
  width: 100px;
}

.bborder {
  border: solid 1px #2c3e50;
  border-radius: 4px;
  margin: 24px 8px 8px 8px;
  padding: 14px;
  position: relative;
}

.bborder p:first-child {
  position: absolute;
  top: -10px;
  left: 10px;
  margin: 0;
  background-color: white;
  color: #42b983;
  font-weight: bold;
  padding: 0 8px;
  display: inline-block;
}
</style>
