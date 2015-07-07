<?php

$show_contact_block = false;

if(is_page()){
    //get this page's data
    $this_page_id = get_queried_object_id();
    $this_page = get_post($this_page_id);
    $this_page->fields = get_fields($this_page->ID);

    //determine whether to show contact block
    if (!empty($this_page->fields['show_contact_block'])) {
        $show_contact_block = true;
    }
}

//get data from contact us page
$contact_us_page = get_page_by_path('contact', OBJECT);
$contact_us_page->fields = get_fields($contact_us_page->ID);

//get contact list
$contacts = new WP_Query(
    array(
        'post_type'      => 'contacts', 'post_status' => 'publish',
        'posts_per_page' => -1, 'ignore_sticky_posts' => 1
    )
);
$contacts = $contacts->posts;
foreach ($contacts as $contact) {
    $contact->fields = get_fields($contact->ID);
}
wp_reset_query();

//get social links
$social_links = new WP_Query(
    array(
        'post_type'      => 'social_links', 'post_status' => 'publish',
        'posts_per_page' => -1, 'ignore_sticky_posts' => 1
    )
);
$social_links = $social_links->posts;
foreach ($social_links as $social_link) {
    $social_link->fields = get_fields($social_link->ID);
}
wp_reset_query();

//get footer menu items
$footer_menu = wp_get_nav_menu_items('footer');

?>


        <!-- /#container -->

        <!-- TODO: Footer Block -->
        <footer>
            <?php if ($show_contact_block): ?>
                <div id="contact-block">
                    <div class="row">
                        <div class="location col-xs-12 col-sm-12 col-md-6 col-lg-6">

                            <a href="https://www.google.com/maps/place/Carmichael+Lynch/@44.98115,-93.274144,17z/data=!3m1!4b1!4m2!3m1!1s0x52b33291d37c3481:0x788b361baf784321" target="_blank">
                                <div class="map"
                                    style="background-image: url('<?= $contact_us_page->fields['map_image']['url']; ?>')">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/230054/red-location-icon.png" />
                                </div>
                            </a>
                        </div>
                        <div class="info col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="center">
                                <h1 class="home-only">Contact Us</h1>
                                <h1><?= $contact_us_page->fields['address']; ?></h1>
                                <h1><?= $contact_us_page->fields['city']; ?>, <?= $contact_us_page->fields['state']; ?> <?= $contact_us_page->fields['zip']; ?></h1>
                                <ul id="contact-list">
                                    <?php foreach ($contacts as $contact): ?>
                                        <?php $entity = '["_trackEvent", "contact", "click", "' . (string)$contact->post_title . '"]';  ?>
                                        <li class="col-xs-6 col-sm-4 col-md-6 col-lg-6">
                                        <span
                                            class="title"><b><?= $contact->post_title; ?></b></span>
                                        <span
                                            class="name"><?= $contact->fields['name']; ?></span>
                                        <span class="tel"><a href="tel:<?= preg_replace(
                                                '/\D/', '', $contact->fields['phone']
                                            ); ?>" data-ga="<?= htmlentities($entity); ?>" ><?= $contact->fields['phone']; ?></a></span>
                                        <span class="email">
                                            <a href="mailto:<?= $contact->fields['email']; ?>" data-ga="<?= htmlentities($entity); ?>"><span><?= $contact->fields['email']; ?></span></a></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

        </footer>
        <?php include('fixed-footer.php'); ?>
        <?php container_close(); ?>
        <!-- END: Footer Block -->

        <div class="loading-overlay gray-bg" data-loader>
            <div class="loading-container center-xs pulse">
                <div class="loading-image">
                    <svg width="110" height="188" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path id="water-tower" d="m84.771,94.48901c1.09399,-2.285 1.78601,-4.36002 2.15799,-5.625h2.72403v-4.40302h-1.94302v-13.17001h-5.78299v-25.44598v-0.886v-4.664l-25.56201,-6.36v-0.856c0,-1.17299 -0.94998,-2.123 -2.12299,-2.123c-1.17401,0 -2.12399,0.95001 -2.12399,2.123v0.85501l-25.56201,6.36099v4.664v0.886l0.043,25.44699h-4.67599h-1.151v13.16901h-1.94501v4.40302h2.724c0.00101,0.00299 0.00201,0.00598 0.00299,0.00998h12.02701c0,0 0,1.444 -2.095,1.51401c-3.42099,0.116 -6.535,0.23099 -9.33099,0.34c0.38501,1.09201 0.896,2.38699 1.55402,3.76102l-14.15201,68.375h4.33701l13.05298,-63.065c1.04401,1.33398 2.24701,2.57599 3.634,3.59998c4.66299,3.43802 12.53799,4.74002 17.91202,5.23801l-2.61002,54.229h4.25101l2.599,-53.95499c0.953,0.03299 1.51099,0.03098 1.51099,0.03098s2.81403,0.00702 6.64502,-0.39297l2.616,54.315h4.25198l-2.646,-54.888c4.52002,-0.76501 9.47302,-2.13101 12.79401,-4.58002c1.388,-1.021 2.59,-2.26498 3.633,-3.599l13.05402,63.065h4.33798l-14.159,-68.37299zm-58.215,-10.02802h-3.23499v-10.62201h3.23499v10.62201l0,0zm23.095,-12.96899c-4.01099,-0.01501 -8.01999,-0.048 -12.02802,-0.099c-2.21298,-0.03 -4.00897,-1.85602 -4.00897,-4.06601v-6.01498v-6.013c0.00098,-2.21201 1.79498,-4.03601 4.00897,-4.06601c0.668,-0.008 1.33603,-0.017 2.00403,-0.02399c1.336,-0.01501 2.67398,-0.02701 4.01099,-0.039c2.21301,-0.02002 4.008,1.79398 4.008,4.04099c-0.00101,2.24802 -1.797,4.07101 -4.008,4.07401c-1.33701,0.00101 -2.67499,0.004 -4.01099,0.00699c-1.108,0.004 -2.00403,0.90802 -2.00403,2.02002c-0.00098,1.11398 0.89603,2.01797 2.00403,2.021c0.66898,0.00198 1.336,0.004 2.00497,0.004c2.673,0.00598 5.345,0.009 8.02002,0.01099c2.21298,0.00101 4.009,1.827 4.009,4.078c-0.00101,2.25 -1.79401,4.07401 -4.01001,4.06601m10.022,0c-2.21399,0.008 -4.00702,-1.815 -4.00702,-4.065c0,-2.25201 1.79102,-4.078 4.00702,-4.07901c1.10699,0 2.005,-0.91199 2.005,-2.035v-6.10199c0,-2.24701 1.79599,-4.06 4.01099,-4.04001v-0.00098c0.66901,0.00598 1.336,0.01199 2.00299,0.01797v-0.00098c2.21503,0.02399 4.01102,1.85397 4.01102,4.078c0,2.22498 -1.79599,4.02499 -4.01102,4.02298c-1.10397,-0.00198 -2.00299,0.90399 -2.00299,2.02499c0.00101,1.12201 0.89801,2.02701 2.00299,2.02402c1.33701,-0.00201 2.67401,-0.005 4.01102,-0.008c2.215,-0.00302 4.01099,1.78699 4.01099,3.99799s-1.79599,4.035 -4.01099,4.06601c-4.01199,0.05099 -8.021,0.08398 -12.03,0.099m22.655,12.979h-12.95099c0,0 0,-1.444 2.09299,-1.51501c3.89301,-0.13098 7.38,-0.26099 10.457,-0.384v-8.733h3.233v10.62201h-2.832v0.01001l0,0z" />
                        </g>
                    </svg>

                </div>
            </div>
        </div>



<?php wp_footer(); ?>


    </body>
</html>
