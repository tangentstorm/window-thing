

function Pane(split, at, content) {
  if ('HVN'.indexOf(split) == -1) {
    throw new Error("expect split in {'H' (horizontal), 'V' (vertical), 'N' (none)} got: " + JSON.stringify(split));
  }
  this.split = split; this.at = at; this.content = content;
}

var tree = Pane('N', 'hello');

function render(ctx, node) {
}

leaf.count = 0;
function leaf(){
  var id = 'T' + (leaf.count++), html = jQuery('#template').html().replace(/{{id}}/g, id);
  return jQuery('<div id="'+id+'">'+ html + '</div>');
} 

function div(content){
  return jQuery('<div></div>').append(content)
}

function hvSplit(hv, id) {
  var je = jQuery('#'+id), pe = je.parent(), sp = div('');
  sp.append(div(je));
  sp.append(div(leaf()));
  pe.append(sp);
  sp.kendoSplitter({ orientation: hv==='V' ? 'vertical' : 'horizontal' })
}

function killPane(id) {
  var je = jQuery('#' + id), pe = je.parent(), se = pe.parent();
  if (!pe.hasClass('k-pane')) return;
  if (!se.hasClass('k-splitter')) return;
  var ks = se.getKendoSplitter();
  ks.remove(pe);
  var sib = se.select('.k-pane'), up = se.parent().closest('.k-splitter');
  if (sib.length !== 1) debugger;
  ks.remove(sib);
  if (up.length && !up.getKendoSplitter()) debugger;
  ks.destroy();
  se.replaceWith(sib.select(div));
  if (up.length) up.getKendoSplitter().resize();
}

jQuery('#root').append(div(leaf()));
