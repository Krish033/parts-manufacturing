<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    
    public function index() {
        return Inertia::render('admin/SubCategory', [
            'subCategories' => \App\Models\Subcategory::with('category')->latest()->paginate(10)->withQueryString(),
            'categories' => \App\Models\Category::all(['id', 'name'])
        ]);
    }

    public function save(Request $request) {
        
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'category_id' => 'required',
            'slug' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'image' => 'nullable',
        ]);
        
        $imagePath = null;
        if ($request->hasFile('image') && $request->file('image') instanceof UploadedFile) {
            $imagePath = $request->file('image')->store('subcategories', 'public');
        }

        if(!($subCategory = \App\Models\Subcategory::find($request->get('id')))) {
            \App\Models\Subcategory::create([
                'name' => $request->name,
                'category_id' => $request->category_id,
                'slug' => $request->slug,
                'description' => $request->description,
                'image' => $imagePath,
                'user_id' => auth()->id() ?? '1',
            ]);    
        } else {
            $updateData = [
                'name' => $request->name,
                'category_id' => $request->category_id,
                'slug' => $request->slug,
                'description' => $request->description,
                'user_id' => auth()->id() ?? '1',
            ];
            if ($imagePath) {
                $updateData['image'] = $imagePath;
            }
            $subCategory->update($updateData); 
        }

        return redirect()->back()->with('success', 'Subcategory saved successfully.');
    }

    public function destroy (Request $request) {

        if(!($id = $request->get('id'))) {
            return redirect()->back()->with('error', 'Id is required.');
        }

        $subCategory = \App\Models\Subcategory::find($id);

        if ($subCategory) {
            $subCategory->delete();
        }

        return redirect()->back()->with('success', 'Subcategory deleted successfully.');
    }
}
