<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome Aboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Google Sans', Roboto, sans-serif;
      background-color: #ffffff;
      color: #202124;
    }
    .container {
      max-width: 600px;
      margin: 48px auto;
      padding: 0 24px;
    }
    .label {
      font-size: 14px;
      color: #5f6368;
      margin-bottom: 32px;
    }
    .heading {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .login-box {
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      font-size: 15px;
    }
    .login-box p {
      margin: 6px 0;
    }
    .link {
      font-size: 14px;
      color: #1a73e8;
      text-decoration: none;
    }
    .footer {
      font-size: 12px;
      color: #5f6368;
      margin-top: 48px;
      border-top: 1px solid #dadce0;
      padding-top: 24px;
    }
  </style>
</head>

<body>
  <div class="container">
    <p class="label">Account Activated • {{ \App\Models\SiteSetting::getSettings()->site_name }}</p>

    <div class="heading">Welcome, {{ $user->name }}</div>

    <p class="text">
      Your registration has been approved by our team, and your account is now active. Below are your login credentials. You can log in and start using the platform right away.
    </p>

    <div class="login-box">
      <p><strong>Email:</strong> {{ $user->email }}</p>
      <p><strong>Temporary Password:</strong> {{ $password }}</p>
    </div>

    <p class="text">
      For your security, we recommend logging in and changing your password immediately.
    </p>

    <p>
      <a href="{{ url('/') }}/login" class="link">Log In Now →</a>
    </p>

    <div class="footer">
      This is an automated message. If you did not sign up for this account, please ignore this email or contact support.
    </div>
  </div>
</body>
</html>
