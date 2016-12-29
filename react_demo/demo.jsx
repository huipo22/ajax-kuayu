var Box = React.createClass({
    getDefaultProps: function () {
        return {
            name: "world"
        }
    },
    getInitialState: function () {
        return {text: "不喜欢"};
    },
    handle() {
        let isLiked = !this.state.isLiked;
        this.setState({
            isLiked: isLiked,
            text: isLiked ? "喜欢" : "不喜欢"
        })
    },
    render: function () {
        var styles = {
            fontSize: "30px",
            color: "#ffffff",
            width: "200px",
            height: "30px",
            background: "#ccc"
        }
        {/*return (<div style={styles} onClick={this.handle}>Hello {this.props.name}</div>)*/
        }
        return (<div style={styles} onClick={this.handle}>{this.state.text}</div>)
    }
})

var Content = React.createClass({
    getInitialState: function () {
        return {data: null};
    },
    componentDidMount: function () {
        $.get("https://api.github.com/users/octocat/gists", function (result) {
            this.setState({
                data: result
            })
        }.bind(this))
    },
    render(){
        var datas = this.state.data;
        console.log(datas)
        if (datas != null) {
            var results=[];
            datas.map(function (k,v) {
                // console.log(k)
                var item=<li key={v}>{k.url}</li>
                results.push(item)
            })
        }

        return (<ul>{results}</ul>)
    }
})


var Rdiv = document.createElement("div");
var Rcon = document.createElement("div");
Rdiv.setAttribute("id", "app");
Rcon.setAttribute("id", "con");
document.body.appendChild(Rdiv);
document.body.appendChild(Rcon);

ReactDOM.render(<Box />, document.getElementById("app"))
ReactDOM.render(<Content />, document.getElementById("con"))