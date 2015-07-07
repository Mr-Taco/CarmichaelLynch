<?php get_header(); ?>
    <section id="content" role="main">
        <div id="error-page-wrapper">
            <div id="error-page-content">
                <h1>404 Page Not Found</h1>
            </div>
        </div>
    </section>

    <script>
        var height = window.innerHeight;
        console.log('height: ', height);
        $('#error-page-wrapper').css({height: height});
    </script>
<?php get_footer(); ?>