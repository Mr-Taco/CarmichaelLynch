<?php

$next_post = $GLOBALS['next_post'];
$prev_post = $GLOBALS['prev_post'];
$view_all = $GLOBALS['view_all'];

?>


<?php if (!empty($prev_post) && !empty($next_post)): ?>
    <?php
    $prev_post->fields = get_fields($prev_post->ID);
    $next_post->fields = get_fields($next_post->ID);
    $prev_category = get_post_categories_classes($prev_post->ID);
    $next_category = get_post_categories_classes($next_post->ID);

    if(count($prev_category) === 0) $prev_category = array('type-'.get_post_type($prev_post));
    if(count($next_category) === 0) $next_category = array('type-'.get_post_type($next_post));

    ?>
    <div id="pagination" class="container-fluid">
        <div class="row">
            <a href="<?= get_permalink($prev_post->ID); ?>">
                <div id="prev-page" class="col-xs-5 <?=join(' ',$prev_category);?>">
                    <i class="fa fa-angle-left col-xs-12 col-sm-2 col-md-1"></i>

                    <div class="blurb col-sm-10 col-md-6">
                        <div class="center">
                            <?php if ($prev_post->post_type == 'person'): ?>
                                <h1><?= $prev_post->post_title; ?></h1>
                                <h2><?= $prev_post->fields['title']; ?></h2>
                            <?php else: ?>
                                <h1><?= $prev_post->fields['heading']; ?></h1>
                                <h2><?= $prev_post->fields['subheading']; ?></h2>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="image-container col-md-5">
                        <div
                            style="background-image:url('<?= ($prev_post->post_type
                                == 'person')
                                ? $prev_post->fields['headshot']['url']
                                : $prev_post->fields['image']['url']; ?>')"
                            class="image"></div>
                    </div>
                </div>
            </a>

            <div id="view-all-pages" class="col-xs-2">
                <a href="<?= $view_all; ?>">
                    <div class="animate-view-all"><span
                            class="square"></span><span
                            class="square"></span><span
                            class="square"></span><span
                            class="square"></span><span
                            class="square"></span><span
                            class="square"></span></div>
                </a>
            </div>
            <a href="<?= get_permalink($next_post->ID); ?>">
            <div id="next-page" class="col-xs-5 col-sm-5 <?=join(' ',$next_category);?>">
                <div class="image-container col-md-5">
                    <div
                        style="background-image:url('<?= ($next_post->post_type
                            == 'person') ? $next_post->fields['headshot']['url']
                            : $next_post->fields['image']['url']; ?>')"
                        class="image"></div>
                </div>
                <div class="blurb col-sm-10 col-md-6">
                    <div class="center">
                        <?php if ($next_post->post_type == 'person'): ?>
                            <h1><?= $next_post->post_title; ?></h1>
                            <h2><?= $next_post->fields['title']; ?></h2>
                        <?php else: ?>
                            <h1><?= $next_post->fields['heading']; ?></h1>
                            <h2><?= $next_post->fields['subheading']; ?></h2>
                        <?php endif; ?>
                    </div>
                </div>
                <i class="fa fa-angle-right col-xs-12 col-sm-2 col-md-1"></i>
            </div>
            </a>
        </div>
    </div>
<?php endif; ?>