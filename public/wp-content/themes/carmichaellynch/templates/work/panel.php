<?php

if($panel['type'] == 'gallery'){
    if(!empty($panel['gallery'])){
        ?>
        <div class="gallery-tile" <?= (!$no_transition) ? "data-transition=\"".($row_order + $panel_order)."\"" : "" ?> data-transition-type="scale">
            <?php show_gallery($panel['gallery'][0], true); ?>
        </div>

        <?php
    }
} elseif($panel['type'] == 'text'){
    include('panel_text.php');
} elseif($panel['type'] == 'media'){
    include('panel_media.php');
}