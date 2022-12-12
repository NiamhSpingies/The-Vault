import { The_Vault } from "../../declarations/The_Vault_backend";

window.addEventListener("load", async function() {
  // console.log("Finished loading");
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  // console.log("Submitted.");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", false);

  if (document.getElementById("input-amount").value.length != 0) {
    await vault.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await vault.withdraw(outputAmount);
  }

  await vault.compound();

  update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});

async function update() {
  const currentAmount = await vault.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};