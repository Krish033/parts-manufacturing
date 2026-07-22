<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $settings = \App\Models\SiteSetting::getSettings();
        @endphp
        <title inertia>{{ $settings->site_title ?: $settings->site_name ?: config('app.name', 'Laravel') }}</title>
        @if($settings->favicon)
            <link rel="icon" type="image/png" href="{{ asset('storage/' . $settings->favicon) }}">
        @endif

        <script>
            window.App = {
                name: "{{ $settings->site_title ?: $settings->site_name ?: config('app.name', 'Laravel') }}"
            };
        </script>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/domain/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
