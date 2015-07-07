<?php

$image = get_field('headshot', $person->ID);
if(!empty($image)){
    $image = $image['sizes']['author_profile'];
}
$email = get_field('email',$person->ID);
$standalone_author = isset($standalone_author) ? $standalone_author : false;
?>


<div class="author <?php if($standalone_author !== true) : ?>col-xs-12 col-sm-5 col-md-4 col-lg-3 <?php else : ?> author-standalone <?php endif;?>">
    <div
        style="background-image:url('<?= $image; ?>')"
        class="portrait"></div>
    <div class="details">
        <div class="center"><span
                class="name"><?= $person->post_type == 'person' ? $person->post_title : get_field('name', $person->ID); ?></span><span
                class="title"> <?= get_field('title', $person->ID); ?></span>
        </div>
    </div>
    <div class="links">
        <a href="<?= get_post_permalink($person->ID); ?>" class="bio">
            <span>View bio</span>
        </a>
        <a href="/people/<?= $person->post_name; ?>/posts" class="view-all">
            <span>View all by <?= explode(' ', $person->post_title)[0]; ?></span>
        </a>
        <?php if(!empty($email)): ?>
        <?php
            $name = (string)$person->post_type == "person" ? $person->post_title : get_field("name", $person->ID);
            $entity = '["_trackEvent", "contact_' . $name . '", "click", "' . $this_page->post_title . '"]';
        ?>
        <a href="mailto:<?=$email;?>" target="_blank" class="contact" data-ga="<?= htmlentities($entity) ?>">
            <span>Contact <?= $person->post_type == 'person' ? $person->post_title : get_field('name', $person->ID); ?></span>
        </a>
        <?php endif; ?>
    </div>
</div>