<?php
    if(!empty($panel['image'])){
        include('panel_media.php');
    }
?>
<div class="text-tile centered table <?= empty($panel['image']) ? 'black-bg-xs' : null;?>">
    <div class="table-center"
        <?= (!$no_transition) ? "data-transition=\"".($row_order + $panel_order)."\"" : "" ?>
         data-transition-type="text" data-style="<?php if(!empty($panel['text_position_from_top'])): ?>top: <?=$panel['text_position_from_top'];?>%; <?php endif; ?>">
        <h3 class="pad-bottom white"><?=$panel['heading'];?></h3>
        <p class="subheader"><?=$panel['text'];?></p>
    </div>
</div>