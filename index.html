/**
 * Nirrox Games Admin - Bot d'envoi rapide Discord (admin.js)
 */

const ADMIN_PASSWORD = "NirroxAdmin2026!";

// Configuration du dépôt principal de jeux
const GITHUB_OWNER = "nirroxbroxi";
const GITHUB_REPO = "Nirrox-Games-official";

function seConnecterAdmin() {
  const passInput = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("error-msg");
  const loginBox = document.getElementById("login-box");
  const dashboardBox = document.getElementById("dashboard-box");

  if (passInput === ADMIN_PASSWORD) {
    if (errorMsg) errorMsg.classList.add("hidden");
    loginBox.classList.add("hidden");
    dashboardBox.classList.remove("hidden");

    // Restaure le Webhook et Token enregistrés sur ton navigateur
    const savedWebhook = localStorage.getItem("nirrox_discord_webhook");
    if (savedWebhook) {
      const el = document.getElementById("discord-webhook-url");
      if (el) el.value = savedWebhook;
    }
    const savedToken = localStorage.getItem("nirrox_github_token");
    if (savedToken) {
      const elToken = document.getElementById("github-token-input");
      if (elToken) elToken.value = savedToken;
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
 * Uploader un fichier jeu .html directement sur GitHub (/Jeux/)
 */
async function uploaderJeuGitHub() {
  const fileInput = document.getElementById("game-file-input");
  const tokenInput = document.getElementById("github-token-input")?.value.trim();
  const btnUpload = document.getElementById("btn-upload-game");

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    afficherStatut("Veuillez choisir un fichier .html de jeu !", "error");
    return;
  }

  if (!tokenInput) {
    afficherStatut("Veuillez coller votre GitHub Personal Access Token (PAT) !", "error");
    return;
  }

  const file = fileInput.files[0];
  if (!file.name.endsWith(".html")) {
    afficherStatut("Le fichier doit obligatoirement être un fichier HTML (.html) !", "error");
    return;
  }

  // Sauvegarde le Token sur ton navigateur
  localStorage.setItem("nirrox_github_token", tokenInput);

  btnUpload.disabled = true;
  btnUpload.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Envoi vers GitHub...`;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const rawContent = e.target.result;

    // Convertit le code source du jeu en base64 pour GitHub
    const bytes = new TextEncoder().encode(rawContent);
    let binString = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binString);

    const filePath = `Jeux/${file.name}`;
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${tokenInput}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `🎮 Ajout auto du jeu ${file.name}`,
          content: base64Content
        })
      });

      if (res.ok || res.status === 201) {
        afficherStatut(`🎉 Jeu '${file.name}' ajouté avec succès sur ton site principal !`, "success");
        fileInput.value = "";
      } else {
        const errorData = await res.json();
        afficherStatut(`Erreur GitHub (${res.status}) : ${errorData.message || 'Token invalide ou sans permission repo'}`, "error");
      }
    } catch (err) {
      afficherStatut("Erreur de connexion au serveur GitHub.", "error");
      console.error(err);
    } finally {
      btnUpload.disabled = false;
      btnUpload.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Téléverser le jeu sur le site`;
    }
  };

  reader.readAsText(file);
}

function seDeconnecter() {
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard-box").classList.add("hidden");
  document.getElementById("admin-pass").value = "";
}

/**
 * Charge un modèle de message pré-fait selon le bouton cliqué
 */
function chargerModele(type) {
  const titleInput = document.getElementById("announce-title");
  const descInput = document.getElementById("announce-desc");
  const colorInput = document.getElementById("announce-color");

  if (!titleInput || !descInput) return;

  switch (type) {
    case 'nouveauJeu':
      titleInput.value = "🎮 NOUVEAU JEU DISPONIBLE !";
      descInput.value = "Un tout nouveau jeu vient d'être ajouté sur Nirrox Games ! Venez l'essayer dès maintenant !";
      if (colorInput) colorInput.value = "#6366f1"; // Violet / Indigo
      break;

    case 'maj':
      titleInput.value = "🚀 CHANGEMENT DE VERSION / MISE À JOUR";
      descInput.value = "Une nouvelle mise à jour est en ligne ! Retrouvez de nouvelles fonctionnalités, des correctifs et une meilleure expérience sur le site.";
      if (colorInput) colorInput.value = "#10b981"; // Vert Émeraude
      break;

    case 'maintenance':
      titleInput.value = "🛠️ MAINTENANCE EN COURS";
      descInput.value = "Le site Nirrox Games est actuellement en maintenance pour amélioration des serveurs. De retour très vite !";
      if (colorInput) colorInput.value = "#f59e0b"; // Orange / Ambre
      break;

    case 'event':
      titleInput.value = "🚨 GROS BUG / DYSFONCTIONNEMENT SIGNALÉ";
      descInput.value = "Un problème technique a été détecté sur le site. Nos équipes travaillent dessus pour résoudre le souci au plus vite ! Merci de votre patience.";
      if (colorInput) colorInput.value = "#ef4444"; // Rouge Alerte
      break;
  }
}

/**
 * Envoie l'annonce en 1 clic
 */
async function envoyerAnnonceDiscord() {
  const webhookUrl = document.getElementById("discord-webhook-url").value.trim();
  const title = document.getElementById("announce-title").value.trim() || "🎮 NOUVEAU JEU DISPONIBLE !";
  const desc = document.getElementById("announce-desc").value.trim() || "Un nouveau jeu vient d'être ajouté sur le site ! Venez jouer dès maintenant.";
  const hexColor = document.getElementById("announce-color")?.value || "#6366f1";
  const siteUrl = document.getElementById("announce-url")?.value.trim() || "https://nirroxbroxi.github.io/Nirrox-Games-official/";
  const btnSend = document.getElementById("btn-send-discord");

  if (!webhookUrl) {
    afficherStatut("Colle ton lien Webhook une première fois !", "error");
    return;
  }

  // Convertit la couleur HEX (#6366f1) en nombre entier pour Discord Embed
  const decimalColor = parseInt(hexColor.replace("#", ""), 16);

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
        url: siteUrl,
        color: decimalColor,
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
