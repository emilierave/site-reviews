<?php

namespace GeminiLabs\SiteReviews\Modules\Validator;

use GeminiLabs\SiteReviews\Database\DefaultsManager;
use GeminiLabs\SiteReviews\Defaults\ValidateReviewDefaults;
use GeminiLabs\SiteReviews\Helpers\Arr;
use GeminiLabs\SiteReviews\Modules\Rating;
use GeminiLabs\SiteReviews\Modules\Validator;
use GeminiLabs\SiteReviews\Request;

class DefaultValidator extends ValidatorAbstract
{
    /**
     * @return bool
     */
    public function isValid()
    {
        $this->errors = glsr(Validator::class)->validate(
            $this->request->toArray(),
            $this->rules()
        );
        return empty($this->errors);
    }

    /**
     * This only validates the provided values in the Request.
     * @return bool
     */
    public function isValidRequest()
    {
        $options = glsr(DefaultsManager::class)->pluck('settings.submissions.required.options');
        $excludedKeys = array_keys(array_diff_key($options, $this->request->toArray()));
        $this->request->excluded = $excludedKeys;
        if ($this->isValid()) {
            return true;
        }
        glsr_log()->warning($this->errors);
        return false;
    }

    /**
     * @return void
     */
    public function performValidation()
    {
        if (!$this->isValid()) {
            glsr_log()->debug($this->errors);
            $this->setErrors(__('Please fix the submission errors.', 'site-reviews'));
            return;
        }
        $values = glsr(ValidateReviewDefaults::class)->merge($this->request->toArray());
        $this->request = new Request($values);
    }

    /**
     * @return array
     */
    protected function defaultRules()
    {
        $maxRating = max(1, (int) glsr()->constant('MAX_RATING', Rating::class));
        $rules = [
            'content' => 'required',
            'email' => 'required|email',
            'name' => 'required',
            'rating' => 'required|between:0,'.$maxRating,
            'terms' => 'accepted',
            'title' => 'required',
        ];
        return glsr()->filterArray('validation/rules', $rules, $this->request);
    }

    /**
     * @return array
     */
    protected function normalizedRules()
    {
        $rules = $this->defaultRules();
        $required = glsr_get_option('submissions.required', []);
        array_walk($rules, function (&$value, $key) use ($required) {
            if (!in_array($key, $required)) {
                $values = explode('|', $value);
                $values = array_diff($values, ['required']); // remove the required rule from validation
                $value = implode('|', $values);
            }
        });
        return $rules;
    }

    /**
     * @return array
     */
    protected function rules()
    {
        $defaultRules = $this->normalizedRules();
        $customRules = array_diff_key($defaultRules,
            glsr(DefaultsManager::class)->pluck('settings.submissions.required.options')
        );
        $excluded = Arr::convertFromString($this->request->excluded); // these fields were ommited with the hide option
        $rules = array_merge($defaultRules, $customRules);
        $rules = array_diff_key($rules, array_flip($excluded));

        glsr_log($rules);

        return glsr()->filterArray('validation/rules/normalized', $rules, $this->request, $defaultRules);
    }
}
