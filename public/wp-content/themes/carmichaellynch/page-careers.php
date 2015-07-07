    <?php
    $this_page = get_post(get_queried_object_id());
    $this_page->fields = get_fields(get_queried_object_id());


    $marquee_image = $this_page->fields['marquee_image']['sizes']['marquee'];
    $marquee_image_mobile = $this_page->fields['marquee_image_mobile']['sizes']['marquee_mobile'];
    $openings_background = $this_page->fields['openings_background_image']['sizes']['panel_square_full'];



    ?>
    <?php get_header(); ?>
        <div class="fixed-header" data-fix-header data-transition="0" data-transition-type="slide" data-transition-direction="bottom">
            <?php include("templates/page-header.php"); ?>
        </div>

    <?php container_start("" , "push-down-marquee gray-bg" , "data-push-down"); ?>
        <div class="hero-marquee-copy push-text-marquee" data-push-text data-transition="1"  data-transition-type="slide" data-transition-direction="bottom">
            <h1><?= $post->post_title; ?></h1>
            <h2><?= $this_page->fields['subheading']; ?></h2>
        </div>
        <div id="current-openings" class="row">
            <div class="col-xs-12 col-sm-12 col-md-12" >
                <a href="/openings">
                    <div style="background: url('<?= $openings_background; ?>') center center no-repeat; background-size: cover;" class="desktop-tile image-tile col-sm-6" data-transition="2" data-transition-type="scale"></div>
                </a>
                <div class="current-openings-text col-xs-12 col-sm-6 col-md-6" data-transition="3"  data-transition-type="text">
                    <div class="text-wrapper">
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['openings_header'];?></h1>
                        <p class="subheader"><?= $this_page->fields['openings_body']; ?></p>
                        <a href="/openings" class="button">
                            <span>
                                <div class="animate-view-all">
                                     <span class="square"></span>
                                     <span class="square"></span>
                                     <span class="square"></span>
                                     <span class="square"></span>
                                     <span class="square"></span>
                                     <span class="square"></span>
                                 </div>
                                 <p><?= $this_page->fields['openings_button_text']; ?></p>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12" >
                <div class="left-wrapper col-lg-6" data-transition="4"  data-transition-type="text"  >
                    <div class="content-wrapper">
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['pack_header'];?></h1>
                        <p class="subheader"><?= $this_page->fields['pack_body'];?></p>
                        <ul class="linksList-desktop">

                            <?php foreach($this_page->fields['pack_list'] as $i=>$pack):  ?>
                                <?php $entity = '["_trackEvent", "wolf_pack", "click", "' . (string)$pack->post_title . '"]'; ?>
                                <li class="link-item <?= $i === 0 ? "active inactive" : "inactive" ?>" data-index="<?= $i ?>" data-ga="<?= htmlentities($entity) ?>"><?=$pack->post_title; ?></li>
                            <?php endforeach; ?>



                        </ul>
                        <div class="list-footer-desktop col-xs-12">
                            <p><?= $this_page->fields['pack_caption'];?></p>
                        </div>
                    </div>
                </div>
                <div style="background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/230054/careers-bg2.jpg') center center no-repeat; background-size: cover;"
                     class="right-wrapper col-xs-12 col-lg-6">
                    <div class="content-wrapper">
                        <div class="text-wrapper">
                            <h1 class="color-txt pad-bottom"><?= $this_page->fields['pack_header'];?></h1>
                            <p class="subheader"><?= $this_page->fields['pack_body'];?></p>
                        </div>
                        <div class="linkslist-wrapper careers">
                            <ul class="linksList">

                                <?php foreach($this_page->fields['pack_list'] as $i=>$pack):  ?>
                                    <?php
                                        $packFields = get_fields($pack->ID);
                                        $backgroundImage = $packFields['background_image']['sizes']['panel_square_full'];
                                        $entity1 = '["_trackEvent", "wolf_pack", "click", "' . (string)$pack->post_title . '"]';
                                        $entity2 = '["_trackEvent", "wolf_pack", "click", "' . (string)$packFields['button_label'] . '"]';
                                    ?>
                                    <li id="link-item-<?= $pack->post_name;?>" class="<?= $i === 0 ? 'active' : 'inactive' ?> link-item" data-ga="<?= htmlentities($entity1) ?>">
                                        <h2 class="link-item-title"><?=$pack->post_title; ?></h2>

                                        <div class="content">
                                            <p class="section"><?= $packFields['caption']; ?></p>
                                            <?= apply_filters('the_content' , $pack->post_content); ?>
                                            <a href="<?= $this_page->fields['wolf_pack_link'] ?>" target="_blank" class="button" data-ga="<?= htmlentities($entity2); ?>">
                                                <span><?= $packFields['button_label']; ?> <i class="fa fa-chevron-right"></i></span>
                                            </a>

                                        </div>
                                    </li>
                                <?php endforeach;  ?>



                            </ul>
                            <div class="list-footer">
                                <p><?= $this_page->fields['pack_caption'];?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <?php get_footer(); ?>