<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Settings', [
            'settings' => SiteSetting::getSettings(),
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:255',
            'site_title' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:100',
            'contact_address' => 'nullable|string|max:1000',
            'currency_symbol' => 'nullable|string|max:10',
            'primary_color' => 'nullable|string|max:20',
            'footer_text' => 'nullable|string|max:1000',
            'logo' => 'nullable',
            'favicon' => 'nullable',
        ]);

        $settings = SiteSetting::getSettings();

        $logoPath = $settings->logo;
        if ($request->hasFile('logo') && $request->file('logo') instanceof UploadedFile) {
            $logoPath = $request->file('logo')->store('settings', 'public');
        }

        $faviconPath = $settings->favicon;
        if ($request->hasFile('favicon') && $request->file('favicon') instanceof UploadedFile) {
            $faviconPath = $request->file('favicon')->store('settings', 'public');
        }

        $settings->update([
            'site_name' => $request->site_name,
            'site_title' => $request->site_title,
            'contact_email' => $request->contact_email,
            'contact_phone' => $request->contact_phone,
            'contact_address' => $request->contact_address,
            'currency_symbol' => $request->currency_symbol,
            'primary_color' => $request->primary_color,
            'footer_text' => $request->footer_text,
            'logo' => $logoPath,
            'favicon' => $faviconPath,
        ]);

        return redirect()->back()->with('success', 'Website settings updated successfully.');
    }

    public function profile()
    {
        return Inertia::render('admin/Profile', [
            'admin' => Auth::guard('admin')->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = $request->password; // Eloquent hashed cast hashes this automatically
        }

        $admin->update($data);

        return redirect()->back()->with('success', 'Admin profile updated successfully.');
    }
}
