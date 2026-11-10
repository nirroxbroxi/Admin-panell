/**
 * Nirrox Games Admin - Bot d'envoi rapide Discord (admin.js)
 */

const ADMIN_PASSWORD = "NirroxAdmin2026!";

function seConnecterAdmin() {
  const passInput = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("error-msg");
  const loginBox = document.getElementById("login-box");
  const dashboardBox = document.getElementById("dashboard-box");

  if (passInput === ADMIN_PASSWORD) {
    if (errorMsg) errorMsg.classList.add("hidden");
    loginBox.classList.add("hidden");
    dashboardBox.classList.remove("hidden");

    // Restaure le Webhook enregistré sur ton navigateur
    const savedWebhook = localStorage.getItem("nirrox_discord_webhook");
    if (savedWebhook) {
      document.getElementById("discord-webhook-url").value = savedWebhook;
    }
  } else {
    if (errorMsg) errorMsg.classList.remove("hidden");
  }
}

function seDeconnecter() {
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard-box").classList.add("hidden");
  document.getElementById("admin-pass").value = "";
}

/**
 * Envoie l'annonce en 1 clic
 */
async function envoyerAnnonceDiscord() {
  const webhookUrl = document.getElementById("discord-webhook-url").value.trim();
  const title = document.getElementById("announce-title").value.trim() || "🎮 NOUVEAU JEU DISPONIBLE !";
  const desc = document.getElementById("announce-desc").value.trim() || "Un nouveau jeu vient d'être ajouté sur le site ! Venez jouer dès maintenant.";
  const btnSend = document.getElementById("btn-send-discord");

  if (!webhookUrl) {
    afficherStatut("Colle ton lien Webhook une première fois !", "error");
    return;
  }

  // Sauvegarde automatique du webhook sur ton navigateur
  localStorage.setItem("nirrox_discord_webhook", webhookUrl);

  btnSend.disabled = true;
  btnSend.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Envoi...`;

  const payload = {
    username: "Nirrox Games Bot",
    avatar_url: "https://raw.githubusercontent.com/nirroxbroxi/Nirrox-Games-official/main/favicon.ico",
    embeds: [
      {
        title: title,
        description: desc,
        url: "https://nirroxbroxi.github.io/Nirrox-Games-official/",
        color: 6512625, // Couleur violette / indigo
        footer: {
          text: "Nirrox Games • Plateforme Officielle"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 204) {
      afficherStatut("🚀 Message envoyé sur Discord !", "success");
    } else {
      afficherStatut(`Erreur (${res.status}) : Vérifie le Webhook.`, "error");
    }
  } catch (err) {
    afficherStatut("Erreur d'envoi.", "error");
    console.error(err);
  } finally {
    btnSend.disabled = false;
    btnSend.innerHTML = `<i class="fa-brands fa-discord"></i> Envoyer le message sur Discord`;
  }
}

function afficherStatut(message, type) {
  const statusBox = document.getElementById("status-box");
  statusBox.classList.remove("hidden", "bg-red-950/80", "text-red-300", "bg-emerald-950/80", "text-emerald-300");

  if (type === "error") {
    statusBox.classList.add("bg-red-950/80", "text-red-300");
  } else {
    statusBox.classList.add("bg-emerald-950/80", "text-emerald-300");
  }

  statusBox.textContent = message;
}
