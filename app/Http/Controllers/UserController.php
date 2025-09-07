<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // POST /users
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'roles' => 'required|array|min:1',
            'roles.*' => 'required|string|exists:roles,name',
        ]);

        $user = \App\Models\User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
        ]);

        // Find role IDs by names
        $roleIds = \App\Models\Role::whereIn('name', $validated['roles'])->pluck('id')->toArray();
        $user->roles()->attach($roleIds);

        return response()->json(['message' => 'User created successfully', 'user' => $user->load('roles')], 201);
    }

    // GET /users?role_id=1
    public function index(Request $request)
    {
        $roleId = $request->query('role_id');
        if ($roleId) {
            $users = \App\Models\User::whereHas('roles', function($q) use ($roleId) {
                $q->where('roles.id', $roleId);
            })->with('roles')->get();
        } else {
            $users = \App\Models\User::with('roles')->get();
        }
        return response()->json($users);
    }
}
