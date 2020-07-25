<?php

namespace GeminiLabs\SiteReviews\Database;

use GeminiLabs\SiteReviews\Helper;
use GeminiLabs\SiteReviews\Helpers\Arr;
use GeminiLabs\SiteReviews\Helpers\Cast;

class UserManager
{
    /**
     * @param int|string $postId
     * @return int
     */
    public function normalizeId($userId)
    {
        if ('user_id' == $userId) {
            return get_current_user_id();
        }
        $userKey = Helper::ifTrue(is_numeric($userId), 'ID', 'login');
        $user = get_user_by($userKey, $userId);
        return Cast::toInt(Arr::get($user, 'ID'));
    }

    /**
     * @param int[]|string $userIds
     * @return array
     */
    public function normalizeIds($userIds)
    {
        return Arr::uniqueInt(array_map([$this, 'normalizeId'], Cast::toArray($userIds)));
    }
}
