// Accessible login validation.
// Called as: onsubmit="return loginFormCheck(this)"
// Shows inline errors (warning icon + text, not colour alone), marks the
// field aria-invalid, and announces the message via role="alert".
function loginFormCheck(form) {
    form = form || document.forms.loginform;

    var code = form.elements.employeecode;
    var pass = form.elements.password;

    clearFieldError(code);
    clearFieldError(pass);

    var firstInvalid = null;

    if (code.value === "" || code.value.indexOf("-") === -1) {
        setFieldError(code, "Enter a valid employee code, including a hyphen.");
        firstInvalid = firstInvalid || code;
    }
    if (pass.value === "") {
        setFieldError(pass, "Enter your password.");
        firstInvalid = firstInvalid || pass;
    }

    if (firstInvalid) {
        firstInvalid.focus();
        return false;
    }
    return true;
}

function setFieldError(field, message) {
    var id = field.id + "-error";
    var box = document.getElementById(id);
    if (!box) {
        box = document.createElement("p");
        box.id = id;
        box.className = "login-error";
        box.setAttribute("role", "alert");
        box.innerHTML =
            '<svg class="login-error-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M12 2 L22 21 H2 Z" fill="#000000"/>' +
            '<rect x="11" y="9"  width="2" height="6" fill="#ffffff"/>' +
            '<rect x="11" y="16" width="2" height="2" fill="#ffffff"/></svg>' +
            '<span class="login-error-text"></span>';
        field.parentNode.insertBefore(box, field.nextSibling);
    }
    box.querySelector(".login-error-text").textContent = message;
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", id);
}

function clearFieldError(field) {
    var id = field.id + "-error";
    var box = document.getElementById(id);
    if (box) {
        box.parentNode.removeChild(box);
    }
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
}