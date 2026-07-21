<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;

class CategoryController extends Controller
{
    
    public function index() {
        return Inertia::render('admin/Category', [
            'categories' => \App\Models\Category::latest()->paginate(10)->withQueryString()
        ]);
    }

    public function save(Request $request) {

        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'image' => 'nullable',
        ]);

        $imagePath = null;
        if ($request->hasFile('image') && $request->file('image') instanceof UploadedFile) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        if(!($category = \App\Models\Category::find($request->get('id')))) {
            \App\Models\Category::create([
                'name' => $request->name,
                'slug' => $request->slug,
                'description' => $request->description,
                'image' => $imagePath,
            ]);    
        } else {
            $updateData = [
                'name' => $request->name,
                'slug' => $request->slug,
                'description' => $request->description,
            ];
            if ($imagePath) {
                $updateData['image'] = $imagePath;
            }
            $category->update($updateData); 
        }

        return redirect()->back()->with('success', 'Category saved successfully.');
    }

    public function destroy (Request $request) {

        if(!($id = $request->get('id'))) {
            return redirect()->back()->with('error', 'Id is required.');
        }

        $category = \App\Models\Category::find($id);

        if ($category) {
            $category->delete();
        }

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
