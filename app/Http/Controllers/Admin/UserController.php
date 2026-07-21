<?php

namespace App\Http\Controllers\Admin;

use App\Events\UserRegistrationApproved;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/User', [
            'users' => User::whereNotNull('password')
                ->select('id', 'name', 'email', 'issuer_phone', 'created_at')
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/UserShow', [
            'user' => $user,
        ]);
    }



    public function approve(Request $request, User $user) {

        $request->validate([
            "password" => "required|confirmed|min:8"
        ]);

        try {
            $user->update([
                'password' => bcrypt($request->password),
                'status' => 1
            ]);
            event(new UserRegistrationApproved(user: $user, password: $request->password));
        } catch (\Throwable $th) {
            return redirect()->back()
                ->withErrors(['password' => $th->getMessage()]);
        }

    }
}
