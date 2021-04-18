<?php

namespace App\Repositories;

use App\Models\Deck;
use App\Models\Group;
use App\Models\GroupDeck;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GroupRepository
{
    /**
     * @param string $groupId
     * @param array $deckIds
     *
     * @return Group
     */
    public function associateDecks(string $groupId, array $deckIds): Group
    {
        /**
         * @var Group $group
         */
        $group = Group::query()->find($groupId);

        $idMap = array_flip($deckIds);

        $toDelete = $group->decks
            ->filter(fn (GroupDeck $deck) => !key_exists($deck->deckId, $idMap))
            ->map(fn (GroupDeck $deck) => $deck->deckId);

        $group->decks()->whereIn('deckId', $toDelete)->delete();

        $existingDecks = $group->decks->keyBy('deckId');

        $newDecks = collect($deckIds)
            ->filter(fn ($id) => !$existingDecks->has($id))
            ->map(fn (string $id) => new GroupDeck(['groupId' => $groupId, 'deckId' => $id, 'active' => false]));
//            ->each(fn (string $id) => $group->decks()->create(['deckId' => $id, 'active' => false]));
//            ->each(function (string $id) use ($group) {
////                dump('save');
//               $group->decks()->save(new GroupDeck(['active' => false]));
//        });
        $group->decks()->saveMany($newDecks);

//        $group->decks()->push;
//        dd($group->decks);

        return $group;
    }

    public function listPage(): LengthAwarePaginator
    {
        return Group::query()
            ->paginate(2);
    }
}
