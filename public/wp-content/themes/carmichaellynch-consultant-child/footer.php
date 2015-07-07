<?php

$issue_slug = get_query_var('issue_slug');
$issue_category = get_query_var('issue_category');

$args = [
    'name'        => $issue_slug,
    'post_type'   => 'issue',
    'numberposts' => 1,
];

$issues = get_posts($args);
$issue = null;

if (!empty($issues)) {
    $issue = $issues[0];
    $post = $issue;
}

$fields = get_fields($post->ID);
$headshot = $fields['headshot']['sizes']['tile_square'];

//get data from contact us page
$contact_us_page = get_page_by_path('contact', OBJECT);
$contact_us_page->fields = get_fields($contact_us_page->ID);

?>
<div class="Footer">
    <p><img alt="" src="<?=$headshot;?>" class="t-round-image"></p>
    <p><strong><?=$fields['name'];?>,</strong> <span class="thin Footer-block"><?=$fields['title'];?></span> </p>
    <dl>
        <dt>Email</dt>
        <dd><a href="mailto:<?=$fields['email'];?>"><?=$fields['email'];?></a></dd>
        <dt>Direct</dt>
        <dd><?=$fields['direct'];?></dd>
        <dt>Mobile</dt>
        <dd><?=$fields['mobile'];?></dd>
    </dl>
    <p><span class="thin Footer-block"><?= $contact_us_page->fields['address']; ?>, <br class="xso-only"><?= $contact_us_page->fields['city']; ?>, <?= $contact_us_page->fields['state']; ?></span><span class="thin Footer-block">(612) 334-6000</span><a href="//carmichaellynch.com" class="thick Footer-block">carmichaellynch.com</a></p>
</div>

</body>
</html>