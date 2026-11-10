/**
 * Nirrox Games Admin - Script du 2ème Site (admin.js)
 * Gère la connexion et le transfert de jeux vers le site principal.
 */

// Mot de passe d'accès pour ce 2ème site admin
const ADMIN_PASSWORD = "NirroxAdmin2026!";

// Informations de ton 1er site (où sont stockés les jeux)
const TARGET_GITHUB_OWNER = "nirroxbroxi";
const TARGET_GITHUB_REPO = "Nirrox-Games-official";

function seConnecterAdmin() {
  const passInput = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("error-msg");
  const loginBox = document.getElementById("login-box");
  const dashboardBox = document.getElementById("dashboard-box");

  if (passInput === ADMIN_PASSWORD) {
    if (errorMsg) errorMsg.classList.add("hidden");
    loginBox.classList.add("hidden");
    dashboardBox.classList.remove("hidden");
  } else {
    if (errorMsg) errorMsg.classList.remove("hidden");
  }
}

function seDeconnecter() {
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard-box").classList.add("hidden");
  document.getElementById("admin-pass").value = "";
}

async function ajouterJeuSurGitHub() {
  const fileInput = document.getElementById("game-file");
  const tokenInput = document.getElementById("github-token").value.trim();
  const statusBox = document.getElementById("status-box");
  const btnUpload = document.getElementById("btn-upload");

  if (!fileInput.files || fileInput.files.length === 0) {
    afficherStatut("Sélectionne un fichier HTML !", "error");
    return;
  }

  if (!tokenInput) {
    afficherStatut("Entre ton GitHub Access Token (PAT) !", "error");
    return;
  }

  const file = fileInput.files[0];
  if (!file.name.toLowerCase().endsWith('.html')) {
    afficherStatut("Le fichier doit obligatoirement se terminer par .html !", "error");
    return;
  }

  btnUpload.disabled = true;
  btnUpload.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Envoi en cours...`;
  afficherStatut("Lecture et encodage du jeu...", "info");

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const content = e.target.result;

      // Encodage Base64 compatible UTF-8 (supporte les accents et caractères spéciaux du jeu)
      const bytes = new TextEncoder().encode(content);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Content = btoa(binary);

      const fileNameClean = file.name.replace(/\s+/g, '-');
      const filePath = `Jeux/${fileNameClean}`;
      const apiUrl = `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/contents/${filePath}`;

      afficherStatut(`Envoi vers GitHub (${filePath})...`, "info");

      // Vérification préalable pour savoir si le fichier existe déjà (nécessite son 'sha' pour le remplacer)
      let fileSha = null;
      try {
        const checkRes = await fetch(apiUrl, {
          headers: {
            "Authorization": `Bearer ${tokenInput}`,
            "Accept": "application/vnd.github+json"
          }
        });
        if (checkRes.ok) {
          const existingData = await checkRes.json();
          fileSha = existingData.sha;
        }
      } catch (errCheck) {
        console.warn("Nouveau fichier détecté");
      }

      // Préparation du payload PUT
      const bodyData = {
        message: `Ajout/Mise à jour du jeu ${fileNameClean} via Admin Panel`,
        content: base64Content
      };
      if (fileSha) {
        bodyData.sha = fileSha;
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${tokenInput}`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        afficherStatut(`🎉 Succès ! Le jeu "${fileNameClean}" a été envoyé sur Nirrox Games !`, "success");
        fileInput.value = "";
      } else {
        const errorData = await response.json();
        let detailMsg = errorData.message || "Erreur inconnue";
        if (response.status === 401) {
          detailMsg = "Token GitHub invalide ou expiré.";
        } else if (response.status === 404) {
          detailMsg = "Dépôt GitHub introuvable. Vérifie le pseudo et nom du repo.";
        } else if (response.status === 403) {
          detailMsg = "Token sans permission. Coche la case 'repo' lors de la création du Token GitHub !";
        }
        afficherStatut(`Erreur (${response.status}) : ${detailMsg}`, "error");
      }
    } catch (err) {
      afficherStatut("Erreur lors du traitement du fichier ou réseau.", "error");
      console.error(err);
    } finally {
      btnUpload.disabled = false;
      btnUpload.innerHTML = `<i class="fa-solid fa-upload"></i> Envoyer le jeu sur Nirrox Games`;
    }
  };

  reader.readAsText(file);
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
