<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Registration Alert</title>

  <!-- Google Sans: officially "Product Sans" not publicly available, but 'Google Sans' is simulated here via Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">

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
      margin-bottom: 24px;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
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
    .user-info {
      font-size: 15px;
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 32px;
    }
    .user-info p {
      margin: 4px 0;
    }
  </style>
</head>

<body>
  <div class="container">
    <p class="label">Admin Notification • {{ \App\Models\SiteSetting::getSettings()->site_name }}</p>

    <div class="heading">New Registration Request</div>

    <div class="user-info">
      <p><strong>Name:</strong> {{ $user->name }}</p>
      <p><strong>Email:</strong> {{ $user->email }}</p>
    </div>

    <p class="text">
      A new user has submitted a registration request. Please log in to your admin dashboard to review and approve the submission.
    </p>

    <p>
      <a href="{{ url('/') }}/admin/register-notifications/{{ $notification->id }}?user_id={{ $user->id }}" class="link">
        View Pending Registrations →
      </a>
    </p>

    <div class="footer">
      This is an automated message. You're receiving this because you're listed as an administrator on {{ \App\Models\SiteSetting::getSettings()->site_name }}.
    </div>
  </div>
</body>
</html>
