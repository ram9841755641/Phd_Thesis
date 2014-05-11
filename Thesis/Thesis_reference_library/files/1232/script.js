jQuery(document).ready(function(){
    setGotoNavSelectEvent();
});

function showhide(parentId, childId, imgLinks){
    if (document.getElementById){
        var obj = document.getElementById(parentId);
        var children = obj.childNodes;
        for(var i = 0; i < children.length; i++) {
            var child = children.item(i);
            if(child.id == childId)
            {
                if (child.style.display == "none"){
                    child.style.display = "block";
                } else {
                    child.style.display = "none";
                }
            }
            if (child.id == imgLinks) {
                var grandChildren = child.childNodes;
                for (var j = 0; j < grandChildren.length; j++) {
                    var child2 = grandChildren.item(j);
                    if (child2.id == 'collapseImage') {
                        if (child2.style.display == "none") {
                            child2.style.display="";
                        } else {
                            child2.style.cssText = 'display:none';
                        }
                    }
                    if (child2.id == 'expandImage') {
                        if (child2.style.display == "none") {
                              child2.style.display="";
                        } else {
                            child2.style.cssText = 'display:none';
                        }
                    }
                }
            }
        }
    }
}

function searchShowFirstPageMal(aForm, aCheckSort)
{
	if (aCheckSort) {
        var sortBy=getFormInput(aForm.name, 'sortBy');

        if (sortBy.defaultChecked == sortBy.checked && sortBy.defaultChecked != null) {
			return;
		}
	}

    getFormInput(aForm.name, 'startPage').value=0;
	aForm.submit();
}

function setGotoNavSelectEvent(){
    jQuery("#dropDownDiv select").change(function(){
        goto(this.value);
    });
}