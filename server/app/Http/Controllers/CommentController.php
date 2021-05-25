<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Http\Requests\CreateCommentRequest;
use App\Models\Card;
use App\Models\Comment;
use App\Models\Deck;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CommentController extends Controller
{
    /**
     * @param Comment $comment
     *
     * @return Comment
     */
    public function get(Comment $comment): Comment
    {
        return $comment;
    }

    public function list(Deck $deck)
    {
        return $deck->comments()->orderByDesc('createdAt')->get();
    }

    /**
     * @param CardRequest $request
     * @param Comment $comment
     *
     * @return Comment
     */
    public function update(Request $request, Comment $comment): Comment
    {
        $comment->update($request->all());

        return $comment;
    }

    /**
     * @param CardRequest $request
     * @param Comment $comment
     *
     * @return Comment
     */
    public function create(CreateCommentRequest $request, Deck $deck, Comment $comment): Comment
    {
        $comment->fill($request->validated());
        $comment->user()->associate($request->user());
        $deck->comments()->save($comment);

        return $comment;
    }

    /**
     * @param Deck $deck
     * @param Comment $comment
     *
     * @return JsonResponse
     */
    public function delete(Deck $deck, Comment $comment): JsonResponse
    {
        $comment->delete();

        return response()->json(null, 204);
    }
}
