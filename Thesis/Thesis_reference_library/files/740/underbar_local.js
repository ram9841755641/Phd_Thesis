function getQueryContext(){
        var query_context = ":QS:";
        var title = jQuery('meta[name="DC.Title"]').attr("content");
        if (title) {
            var search_title = title.replace(/[:\.,]/g, "");
            search_title = search_title.replace(/\b(and|or|a|of|the|in|with|to|an|for)\b/gi, "");
            search_title = search_title.replace(/^\s/, "");
            search_title = search_title.replace(/\s+/g, " OR ");
            query_context = query_context + search_title;
        }
        
        //query_context = ":SUBJ:" + taxonomies.join();
        return query_context;
}

function getJnlCode(){
        var doi = jQuery('meta[name="DC.Identifier"]').attr("content");
        var doi_elements = doi.split("/");
        return doi_elements[1];    
}