import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "./../actions";
import { StoreState } from "./../reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

export class _App extends React.Component<AppProps, AppState> {
  state: AppState = {
    fetching: false,
  };
  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({
        fetching: false,
      });
    }
  }
  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({
      fetching: true,
    });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? "Loading..." : ""}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

const mapDispatchToProps = {
  fetchTodos,
  deleteTodo,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
