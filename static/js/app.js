"use strict";

// Render a response as JSON so strings and error details are easy to inspect.
function showResult(resultId, statusId, data, status) {
  document.getElementById(resultId).textContent = JSON.stringify(data, null, 2);
  document.getElementById(statusId).textContent = status;
}

async function sendRequest(form, resultId, statusId, url, options) {
  const button = form.querySelector("button");
  button.disabled = true;
  document.getElementById(statusId).textContent = "请求中...";

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    showResult(resultId, statusId, data, response.ok ? `${response.status} OK` : `${response.status} ERROR`);
  } catch (error) {
    showResult(resultId, statusId, { error: error.message }, "请求失败");
  } finally {
    button.disabled = false;
  }
}

document.getElementById("hello-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  if (!name) return;

  sendRequest(form, "hello-result", "hello-status", `/api/hello?name=${encodeURIComponent(name)}`);
});

document.getElementById("submit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.elements.message.value;

  // JSON.stringify turns the entered text into a valid JSON string request body.
  sendRequest(form, "submit-result", "submit-status", "/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
});
