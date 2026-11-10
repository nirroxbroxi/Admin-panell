/**
 * Nirrox Games Admin - Script d'Annonces Discord (admin.js)
 * Permet d'envoyer des annonces formatées (Embeds) sur un salon Discord via Webhook.
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

    // Restaure automatiquement le lien Webhook sauvegardé sur ton appareil
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
 * Modèles pré-faits d'annonces
 */
const modelesAnnonces = {
  nouveauJeu: {
    titre: "🎮 NOUVEAU JEU DISPONIBLE !",
    desc: "Un nouveau jeu vient d'être ajouté sur Nirrox Games ! Venez l'essayer dès maintenant.",
    couleur: "#6366f1"
  },
  maj: {
    titre: "🚀 MISE À JOUR DU SITE",
    desc: "Le site Nirrox Games a été mis à jour avec de nouvelles fonctionnalités et des corrections de bugs !",
    couleur: "#10b981"
  },
  maintenance: {
    titre: "🛠️ MAINTENANCE PROGRAMMÉE",
    desc: "Une courte maintenance est en cours sur le site pour ajouter de nouveaux jeux. À tout de suite !",
    couleur: "#f59e0b"
  },
  event: {
    titre: "🏆 ÉVÉNEMENT DU WEEK-END",
    desc: "Qui fera le meilleur score aujourd'hui ? Défiez vos amis sur nos jeux HTML5 !",
    couleur: "#a855f7"
  }
};

function chargerModele(cle) {
  const mod = modelesAnnonces[cle];
  if (!mod) return;

  document.getElementById("announce-title").value = mod.titre;
  document.getElementById("announce-desc").value = mod.desc;
  document.getElementById("announce-color").value = mod.couleur;
}

/**
 * Envoie l'annonce à Discord via Webhook
 */
async function envoyerAnnonceDiscord() {
  const webhookUrl = document.getElementById("discord-webhook-url").value.trim();
  const title = document.getElementById("announce-title").value.trim();
  const desc = document.getElementById("announce-desc").value.trim();
  const colorHex = document.getElementById("announce-color").value;
  const siteUrl = document.getElementById("announce-url").value.trim();
  const btnSend = document.getElementById("btn-send-discord");

  if (!webhookUrl) {
    afficherStatut("Veuillez coller votre URL Webhook Discord !", "error");
    return;
  }

  // Sauvegarde le Webhook uniquement sur ton navigateur local
  localStorage.setItem("nirrox_discord_webhook", webhookUrl);

  if (!title || !desc) {
    afficherStatut("Le titre et la description ne peuvent pas être vides !", "error");
    return;
  }

  // Conversion de la couleur Hex (#6366f1) en nombre decimal pour Discord
  const colorDecimal = parseInt(colorHex.replace("#", ""), 16);

  btnSend.disabled = true;
  btnSend.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Envoi de l'annonce...`;

  // Structure du message Discord Embed
  const payload = {
    username: "Nirrox Games Bot",
    avatar_url: "https://raw.githubusercontent.com/nirroxbroxi/Nirrox-Games-official/main/favicon.ico",
    embeds: [
      {
        title: title,
        description: desc,
        url: siteUrl || null,
        color: colorDecimal,
        footer: {
          text: "Nirrox Games • Plateforme Officielle",
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 204) {
      afficherStatut("🎉 Annonce publiée sur Discord avec succès !", "success");
    } else {
      afficherStatut(`Erreur Discord (${res.status}) : Vérifie ton lien Webhook.`, "error");
    }
  } catch (err) {
    afficherStatut("Erreur réseau ou URL Webhook invalide.", "error");
    console.error(err);
  } finally {
    btnSend.disabled = false;
    btnSend.innerHTML = `<i class="fa-brands fa-discord"></i> Publier l'annonce sur Discord`;
  }
}

function afficherStatut(message, type) {
  const statusBox = document.getElementById("status-box");
  statusBox.classList.remove("hidden", "bg-red-950/80", "text-red-300", "bg-emerald-950/80", "text-emerald-300", "bg-indigo-950/80", "text-indigo-300");

  if (type === "error") {
    statusBox.classList.add("bg-red-950/80", "text-red-300");
  } else if (type === "success") {
    statusBox.classList.add("bg-emerald-950/80", "text-emerald-300");
  } else {
    statusBox.classList.add("bg-indigo-950/80", "text-indigo-300");
  }

  statusBox.textContent = message;
}
