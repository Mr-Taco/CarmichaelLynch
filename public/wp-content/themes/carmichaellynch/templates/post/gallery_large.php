<div class="content <?php if ($show_author): ?> col-xs-12 col-sm-7 col-md-8 col-lg-9 <?php else: ?> col-xs-12 col-lg-pad-right <?php endif; ?>">
    <?php the_content(); ?>
    <?php if ($show_author):
        $standalone_author = true;
        include(dirname(__FILE__) . '../../person.php');
    endif; ?>
</div>


<div class="content-media col-xs-12">
    <?php show_gallery($gallery); ?>
</div>