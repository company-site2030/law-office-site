<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-storage-compat.js"></script>

<script>
  // إعداد Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAzH6gqMdbxKhoZwkWwfJuuopElNRU2JsU",
    authDomain: "alotebi-3500c.firebaseapp.com",
    projectId: "alotebi-3500c",
    storageBucket: "alotebi-3500c.appspot.com",
    messagingSenderId: "99457641243",
    appId: "1:99457641243:web:b9e86295f64e4f652b81be",
    measurementId: "G-HQF5V5FY2L"
  };

  // تهيئة Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
</script>
