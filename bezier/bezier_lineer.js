function lineer() {
    var g = new GraphicsControl("CanvasLine");
    g.context.lineWidth = 5;
    g.BeginFill("#fff");
    var p1 = g.AddControlPoint(80, 150);
    var p2 = g.AddControlPoint(270, 50);
    g.EndFill();

    p1.ConnectInputX("p1_lineerx");
    p1.ConnectInputY("p1_lineery");
    p2.ConnectInputX("p2_lineerx");
    p2.ConnectInputY("p2_lineery");

    g.context.lineWidth = 5;
    g.AddLine(p1, p2);
    g.context.lineWidth = 1;

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 18px Arial";
    var p1t = g.AddText(70, 140, "p1");
    var p2t = g.AddText(260, 40, "p2");
    p1t.points[0].AddParent(p1);
    p2t.points[0].AddParent(p2);
    g.EndFill();


    g.context.lineWidth = 1;
    g.context.strokeStyle = "#a31515";
    g.BeginFill("#a31515");
    var resultp = g.AddControlPoint(100, 100);
    resultp.control = false;
    g.EndFill();

    g.context.lineWidth = 5;
    g.context.strokeStyle = "#0ca500";
    g.AddLine(p1, resultp);
    g.context.lineWidth = 1;

    g.LayerRefresh([p1, p2, resultp]);

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 14px Arial";
    var resultt = g.AddText(95, 90, "R");
    resultt.points[0].AddParent(resultp);
    g.EndFill();

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 11px Arial";
    var p1v = g.AddText(80, 170, "(2,2)");
    var p2v = g.AddText(270, 70, "(2,2)");
    var resultv = g.AddText(100, 120, "(2,2)");
    resultv.points[0].AddParent(resultp);
    p1v.points[0].AddParent(p1);
    p2v.points[0].AddParent(p2);
    g.EndFill();


    function Lineer(p1, p2, deger) {
        return {
            x: (p1.x + ((p2.x - p1.x) * deger)),
            y: (p1.y + ((p2.y - p1.y) * deger))
        };
    }

    function valueChange() {
        var r = Lineer({x: p1.x, y: p1.y}, {x: p2.x, y: p2.y}, document.getElementById("deger_lineer").value);
        resultp.Move(r.x, r.y);
        document.getElementById("degery_lineer").value = document.getElementById("deger_lineer").value;
        resultv.text = "(" + Math.round(r.x) + "," + Math.round(r.y) + ")";
        p1v.text = "(" + Math.round(p1.x) + "," + Math.round(p1.y) + ")";
        p2v.text = "(" + Math.round(p2.x) + "," + Math.round(p2.y) + ")";
        g.Draw();
    }

    document.getElementById("deger_lineer").addEventListener('change', valueChange, false);
    document.getElementById("deger_lineer").addEventListener('keyup', valueChange, false);
    document.getElementById("deger_lineer").addEventListener('input', valueChange, false);
    function valueChangeY() {
        document.getElementById("deger_lineer").value = document.getElementById("degery_lineer").value;
        valueChange();
    }

    document.getElementById("degery_lineer").addEventListener('change', valueChangeY, false);
    document.getElementById("degery_lineer").addEventListener('keyup', valueChangeY, false);
    document.getElementById("degery_lineer").addEventListener('input', valueChangeY, false);
    p1.on("move", valueChange);
    p2.on("move", valueChange);
    valueChange();
}
lineer();