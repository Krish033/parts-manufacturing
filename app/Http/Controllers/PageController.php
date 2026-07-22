<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function technicalDocuments()
    {
        return Inertia::render('users/pages/StaticPage', [
            'title' => 'Technical Documents',
            'content' => 'Here you will find our technical documents, installation guides, and service manuals.'
        ]);
    }

    public function faq()
    {
        return Inertia::render('users/pages/StaticPage', [
            'title' => 'Frequently Asked Questions',
            'content' => 'Find answers to common questions about our parts, shipping, and more.'
        ]);
    }

    public function helpCenter()
    {
        return Inertia::render('users/pages/StaticPage', [
            'title' => 'Help Center',
            'content' => 'Welcome to our Help Center. Please let us know how we can assist you.'
        ]);
    }

    public function repairServices()
    {
        return Inertia::render('users/pages/StaticPage', [
            'title' => 'Repair Services',
            'content' => 'We offer professional repair services for various automotive parts. Contact us for details.'
        ]);
    }

    public function returnsExchange()
    {
        return Inertia::render('users/pages/StaticPage', [
            'title' => 'Returns & Exchange',
            'content' => 'Our returns and exchange policy allows you to return items within 30 days of purchase.'
        ]);
    }
}
