import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  CloseButton,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Overlay,
  Tooltip
} from "react-bootstrap";
import { bubbleSort, quickSort, insertionSort } from "../lib/sorts";

export default function Interface() {
  const [text, setText] = useState("" as string);
  const [array, setArray] = useState([] as number[]);
  const [sortedArray, setSortedArray] = useState([] as number[]);
  const [history, setHistory] = useState([] as number[][]);
  const [error, setError] = useState("" as string);

  const [isCopy, setIsCopy] = useState(false);
  const copyRef = useRef(null);
  useEffect(() => {
    let arr: number[] = text.split(",").map((i) => Number(i));
    setArray(arr);
  }, [text]);
  useEffect(() => {
    if (array.length > 10) setError("Max 10 elements!");
    else setError("");
  }, [array]);

  const sortedCopy = async () => {
    await navigator.clipboard.writeText(sortedArray.join(", "));
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };
  const reverseSorted = () => {
    const arr: number[] = sortedArray.slice(0);
    setSortedArray(arr.reverse());
  };

  return (
    <div className="d-flex flex-column mb-3 w-50 p-3 square border border-5">
      <InputGroup className="mb-1">
        <InputGroup.Text id="inputGroup-sizing-default">
          Input Array
        </InputGroup.Text>
        <FormControl
          placeholder="split elements ',' "
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button variant="danger" size="sm" onClick={(e) => setText("")}>
          {"<"}
        </Button>
      </InputGroup>

      {error !== "" ? (
        <Alert variant="danger" dismissible>
          <p>{error}</p>
        </Alert>
      ) : (
        <></>
      )}

      <InputGroup>
        <InputGroup.Text id="inputGroup-sizing-default">
          Sorted Array
        </InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={sortedArray.join(", ")}
          disabled
        />
        <Button
          variant="danger"
          size="sm"
          onClick={(e) => {
            setSortedArray([]);
            setHistory([]);
          }}
        >
          {"<"}
        </Button>
      </InputGroup>

      <ButtonGroup className="mb-5" size="sm">
        <Button variant="secondary" onClick={sortedCopy} ref={copyRef}>
          Copy Sorted
        </Button>
        <Overlay target={copyRef.current} show={isCopy} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
        <Button variant="secondary" onClick={reverseSorted}>
          Reverse Sorted
        </Button>
      </ButtonGroup>

      <h3>Sorts:</h3>
      <ButtonGroup className="mb-5">
        <Button
          variant="success"
          onClick={(e) => {
            const bubbleSorted: {
              array: number[];
              history: number[][];
            } = bubbleSort(array.slice(0));
            setSortedArray(bubbleSorted.array);
            setHistory(bubbleSorted.history);
          }}
        >
          BubbleSort
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={(e) => {
            const insertSorted: {
              array: number[];
              history: number[][];
            } = insertionSort(array.slice(0));
            setSortedArray(insertSorted.array);
            setHistory(insertSorted.history);
          }}
        >
          InsertionSort
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={(e) => {
            const quickSorted: {
              array: number[];
              history: number[][];
            } = quickSort(array.slice(0));
            setSortedArray(quickSorted.array);
            setHistory(
              quickSorted.history.slice(0, quickSorted.history.length / 2 + 1)
            );
          }}
        >
          QuickSort
        </Button>
      </ButtonGroup>
      <h3>Input Array:</h3>
      <div className="d-flex mb-5">
        {array.map((element) => (
          <div className="p-3 w-100 border text-center">{element}</div>
        ))}
      </div>
      <h3>History of sort:</h3>
      <div className="d-flex flex-column">
        {history.map((mention) => (
          <div className="d-flex">
            {mention.map((element) => (
              <div className="p-3 w-100 border text-center">{element}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
