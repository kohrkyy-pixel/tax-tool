# 캄보디아 세무신고 관리 — Android 앱

저장소 루트의 index.html(세무 툴)을 그대로 담아 APK로 만드는 프로젝트입니다.
GitHub Actions(.github/workflows/build-apk.yml)가 index.html 또는 이 폴더가 바뀔 때마다 자동으로 APK를 빌드해
Releases 페이지에 올립니다.

- 필요한 GitHub Secrets (Settings → Secrets and variables → Actions)
  - ANDROID_KEYSTORE_BASE64 : 서명키(.jks)를 base64로 변환한 값
  - ANDROID_KEYSTORE_PASSWORD : 서명키 암호
  (없어도 빌드는 되지만, 매번 서명이 달라져 업데이트 시 기존 앱을 지우고 다시 설치해야 합니다.)
