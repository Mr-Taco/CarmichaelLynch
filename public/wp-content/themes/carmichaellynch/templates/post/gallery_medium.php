<?php
    $gallery_position = get_field('gallery_position');
?>
<div class="content col-xs-12 col-sm-6 <?=$gallery_position == 'left' ? 'col-sm-push-6' : null;?>">
    <?php the_content(); ?>

    <?php if ($show_author): include(dirname(__FILE__) . '../../person.php'); endif; ?>

</div>
<div class="col-xs-12 col-sm-6 <?=$gallery_position == 'left' ? 'col-sm-pull-6' : null;?>">
    <?php show_gallery($gallery); ?>
</div>