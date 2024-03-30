<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let data = {
        file: {
            url: ''
        },
        caption: '',
        alt: '',
        withBorder: false,
        withBackground: false,
        stretched: false,
    };

    $: dispatch("updateData", data);

    let pasteUrlFieldOpen = false;
    let altFieldOpen = false;

    function updateUrl(newUrl) {
        data.file.url = newUrl;
    }

    function mediaManagerClick() {
        pasteUrlFieldOpen = false;
        altFieldOpen = false;
        openMediaFinder()
    }

    function pasteUrlClick() {
        altFieldOpen = false;
        pasteUrlFieldOpen = !pasteUrlFieldOpen;
    }

    function altTextClick() {
        pasteUrlFieldOpen = false;
        altFieldOpen = !altFieldOpen;
    }

    function openMediaFinder() {
        // @ts-ignore
        new window.$.wn.mediaManager.popup({
            alias: 'ocmediamanager',
            cropAndInsertButton: false,
            mode: 'video',
            updateUrl: updateUrl,
            onInsert: function(items) {
                if (!items.length) {
                    // @ts-ignore
                    window.$.wn.alert(window.$.wn.lang.get('mediamanager.invalid_file_empty_insert'))
                    return
                }

                if (items.length > 1) {
                    // @ts-ignore
                    window.$.wn.alert(window.$.wn.lang.get('mediamanager.invalid_file_single_insert'))
                    return
                }

                var link,
                    // @ts-ignore
                    textIsEmpty = window.$.trim(text) === ''

                for (var i=0, len=items.length; i<len; i++) {
                    var text = textIsEmpty ? items[i].title : text

                    link = items[i].publicUrl
                }

                this.options.updateUrl(link);

                this.hide()
            }
        });
    }
</script>

<div class="video-block"
class:video-block--populated={data?.file?.url}
class:video-block--paste-field-open={pasteUrlFieldOpen}
>
    <div class="video-block__control-box">
        <div class="video-block__box-top">
            <button on:click|preventDefault={mediaManagerClick} class="video-block__button">Open Media Finder</button>
            <button on:click|preventDefault={pasteUrlClick} class="video-block__button">Paste URL</button>
            <button on:click|preventDefault={altTextClick} class="video-block__button">Alt Text</button>
        </div>
        <div class="video-block__box-bottom">
            {#if pasteUrlFieldOpen && data}
                <input bind:value={data.file.url}>
            {/if}
            {#if altFieldOpen && data}
                <input bind:value={data.alt}>
            {/if}
        </div>
    </div>
    {#if data?.file?.url}
        <video src={data?.file?.url}></video>
    {/if}
</div>

<style lang="sass">
    .video-block
        $margin: 4px

        position: relative
        min-height: 60px

        &__control-box
            position: absolute
            display: flex
            flex-flow: column
            gap: $margin
            top: $margin
            left: $margin

        &__box-top
            display: flex
            gap: $margin

        &__box-botton

        &__button
            font-size: 13px
            text-align: left
            outline: none !important
            box-shadow: inset 0 -2px 0 rgba(0,0,0,.15)
            display: inline-block
            margin-bottom: 0
            font-weight: normal
            text-align: center
            vertical-align: middle
            cursor: pointer
            background-image: none
            border: 1px solid transparent
            white-space: nowrap
            padding: 8px 19.5px
            font-size: 14px
            line-height: 1.42857143
            border-radius: 3px
            user-select: none

        &--populated

        &--paste-field-open
            min-height: 100px

        img
            max-width: 100%
            height: auto

        input
            position: relative
            border: 1px solid #d1d6d9
            box-shadow: inset 0 1px 0 rgba(209,214,217,0.25),0 1px 0 rgba(255,255,255,.5)
            display: block
            width: 100%
            height: 38px
            font-size: 14px
            line-height: 1.42857143
            color: #385487
            background-color: #fff
            background-image: none
            border-radius: 3px
            transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s

</style>
