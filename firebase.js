<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = [
    apiKey: "AIzaSyAupP7wF2ABddrFqNdBujBpXFZOero5SUQ",
    authDomain: "continue-e01e3.firebaseapp.com",
    projectId: "continue-e01e3",
    storageBucket: "continue-e01e3.firebasestorage.app",
    messagingSenderId: "157981322560",
    appId: "1:157981322560:web:37e08ddaebdea285035ea5",
    measurementId: "G-W42QNGLW5F"
  ];

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>