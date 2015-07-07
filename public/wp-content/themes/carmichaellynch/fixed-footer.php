<?php
/**
 * Created by PhpStorm.
 * User: wildlife009
 * Date: 3/19/15
 * Time: 12:17 PM
 */

$pagination = $GLOBALS['pagination'];
?>

<div class="fixed-footer col-xs-12" data-fix-footer>
    <?php if($pagination === true) include('templates/pagination.php'); ?>
    <div id="lower-strap" class="container-fluid">
        <div class="row">
            <div
                class="social footer-col col-xs-12 col-sm-4 col-sm-push-4 col-md-4 col-md-push-4 col-lg-4 col-lg-push-4">
                <?php foreach ($social_links as $social_link): ?>
                    <?php
                    $entity = '["_trackEvent", "footer", "click", "' . (string)$social_link->post_name . '"]';
                    ?>
                    <a href="<?=$social_link->fields['url'];?>" target="_blank" data-ga="<?= htmlentities($entity); ?>"><span id="<?=$social_link->post_name;?>" class="fa fa-<?=$social_link->fields['icon'];?>"></span></a>
                <?php endforeach; ?>
            </div>
            <div class="copyright footer-col col-xs-5 col-sm-4 col-sm-pull-4 col-md-4 col-md-pull-4 col-lg-4 col-lg-pull-4">
                <span>&copy; <?=date('Y');?> Carmichael Lynch</span></div>

            <div class="links footer-col col-xs-7  col-sm-4 col-md-4 col-lg-4">
                <?php foreach ($footer_menu as $footer_menu_item): ?>
                    <a href="<?= $footer_menu_item->url; ?>"><?= $footer_menu_item->title; ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>