function quad() {

    var g = new GraphicsControl("CanvasQuad");
    g.context.lineWidth = 5;
    g.BeginFill("#fff");
    var p1 = g.AddControlPoint(80, 150);
    var p2 = g.AddControlPoint(175, 50);
    var p3 = g.AddControlPoint(270, 150);
    g.EndFill();

    p1.ConnectInputX("p1_kareselx");
    p1.ConnectInputY("p1_karesely");
    p2.ConnectInputX("p2_kareselx");
    p2.ConnectInputY("p2_karesely");
    p3.ConnectInputX("p3_kareselx");
    p3.ConnectInputY("p3_karesely");

    g.context.lineWidth = 4;
    g.context.strokeStyle = "#cccccc";
    g.AddLine(p1, p2);
    g.AddLine(p2, p3);
    g.context.strokeStyle = "#000";

    g.context.lineWidth = 5;
    g.AddQuadCurve(p1, p2, p3);
    g.context.lineWidth = 1;

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 18px Arial";
    var p1t = g.AddText(70, 140, "p1");
    var p2t = g.AddText(165, 40, "p2");
    var p3t = g.AddText(260, 140, "p3");
    p1t.points[0].AddParent(p1);
    p2t.points[0].AddParent(p2);
    p3t.points[0].AddParent(p3);
    g.EndFill();


    g.context.lineWidth = 1;
    g.context.strokeStyle = "#0ca500";
    g.BeginFill("#0ca500");
    var resultp1 = g.AddControlPoint(100, 100);
    var resultp2 = g.AddControlPoint(100, 100);
    resultp1.control = false;
    resultp2.control = false;
    resultp1.scale = 4;
    resultp2.scale = 4;
    g.EndFill();

    g.context.lineWidth = 3;
    g.AddLine(resultp1, resultp2);

    g.context.lineWidth = 1;
    g.context.strokeStyle = "#a31515";
    g.BeginFill("#a31515");
    var resultp = g.AddControlPoint(100, 100);
    resultp.control = false;
    g.EndFill();


    g.LayerRefresh([p1, p2, p3, resultp]);

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 14px Arial";
    var resultt = g.AddText(95, 90, "R");
    resultt.points[0].AddParent(resultp);
    g.EndFill();

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 11px Arial";
    var p1v = g.AddText(80, 170, "(2,2)");
    var p2v = g.AddText(175, 70, "(2,2)");
    var p3v = g.AddText(270, 170, "(2,2)");
    var resultv = g.AddText(100, 120, "(2,2)");
    p1v.points[0].AddParent(p1);
    p2v.points[0].AddParent(p2);
    p3v.points[0].AddParent(p3);
    resultv.points[0].AddParent(resultp);
    g.EndFill();


    function Lineer(p1, p2, deger) {
        return {
            x: (p1.x + ((p2.x - p1.x) * deger)),
            y: (p1.y + ((p2.y - p1.y) * deger))
        };
    }

    function valueChange() {
        var r = Lineer({x: p1.x, y: p1.y}, {x: p2.x, y: p2.y}, document.getElementById("deger_karesel").value);
        resultp1.Move(r.x, r.y);
        r = Lineer({x: p2.x, y: p2.y}, {x: p3.x, y: p3.y}, document.getElementById("deger_karesel").value);
        resultp2.Move(r.x, r.y);

        r = Lineer({x: resultp1.x, y: resultp1.y}, {
            x: resultp2.x,
            y: resultp2.y
        }, document.getElementById("deger_karesel").value);
        resultp.Move(r.x, r.y);

        document.getElementById("degery_karesel").value = document.getElementById("deger_karesel").value;
        resultv.text = "(" + Math.round(r.x) + "," + Math.round(r.y) + ")";
        p1v.text = "(" + Math.round(p1.x) + "," + Math.round(p1.y) + ")";
        p2v.text = "(" + Math.round(p2.x) + "," + Math.round(p2.y) + ")";
        p3v.text = "(" + Math.round(p3.x) + "," + Math.round(p3.y) + ")";
        g.Draw();
    }

    document.getElementById("deger_karesel").addEventListener('change', valueChange, false);
    document.getElementById("deger_karesel").addEventListener('keyup', valueChange, false);
    document.getElementById("deger_karesel").addEventListener('input', valueChange, false);
    function valueChangeY() {
        document.getElementById("deger_karesel").value = document.getElementById("degery_karesel").value;
        valueChange();
    }

    document.getElementById("degery_karesel").addEventListener('change', valueChangeY, false);
    document.getElementById("degery_karesel").addEventListener('keyup', valueChangeY, false);
    document.getElementById("degery_karesel").addEventListener('input', valueChangeY, false);
    p1.on("move", valueChange);
    p2.on("move", valueChange);
    p3.on("move", valueChange);
    valueChange();

}
quad();
