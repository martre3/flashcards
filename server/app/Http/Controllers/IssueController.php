<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Deck;
use App\Models\Issue;

class IssueController extends Controller
{
    /**
     * @param Deck $deck
     * @param Card $card
     * @param Issue $issue
     *
     * @return Issue
     */
    public function get(Deck $deck, Card $card, Issue $issue): Issue
    {
        return $issue;
    }
}
