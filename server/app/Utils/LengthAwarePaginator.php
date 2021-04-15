<?php

namespace App\Utils;

class LengthAwarePaginator extends \Illuminate\Pagination\LengthAwarePaginator
{
    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'currentPage' => $this->currentPage(),
            'data' => $this->items->toArray(),
            'firstPageUrl' => $this->url(1),
            'from' => $this->firstItem(),
            'lastPage' => $this->lastPage(),
            'lastPageUrl' => $this->url($this->lastPage()),
            'links' => $this->linkCollection()->toArray(),
            'nextPageUrl' => $this->nextPageUrl(),
            'path' => $this->path(),
            'perPage' => $this->perPage(),
            'prevPageUrl' => $this->previousPageUrl(),
            'to' => $this->lastItem(),
            'total' => $this->total(),
        ];
    }
}
