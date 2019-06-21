Sometimes when reviewing a large Github PR you can get lost on all the files to be reviewed. One way to manage which files you've already reviewed so that you can focus on the rest is by simply collapsing the files as you review them. However, if you refresh the page, all the files will be uncollapsed and you will lose that information.

By running this javascript on a Github PR page, the code will watch for what files you collapse and persist that information to local storage. If you go back to the same PR and run this code again, it will collapse all the files that were previously collapsed.

It also adds a red bar on the bottom of each file that can be pressed for quick collapse and also to focus on the next file. A reset button is added to the right of the Review Changes button to uncollapse all files back. A remove markers button is added as well there, which allows you to remove all "+" and "-" markers from the review page for better readability.

The recommended way to use this code is by creating a javascript bookmarklet (e.g. use http://bookmarklets.org/maker/) and create a bookmark in your browser with that URL, that could be clicked from your bookmarks bar for example.