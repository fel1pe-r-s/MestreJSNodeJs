# Go (Golang)

**Tags**: `#Go` `#Backend` `#Concurrency`
**Data**: 2024-12-17
**Links Relacionados**: [[Docker]], [[Kubernetes]]

---

## 💡 O que é?
Go é uma linguagem criada pelo Google (2009) focada em simplicidade, eficiência e concorrência. É fortemente tipada e compilada.

## ⚙️ Como funciona?
Possui Garbage Collection (como Java/JS) mas compila para binário nativo (como C). Seu destaque são as **Goroutines** (threads leves) e **Channels** para comunicação segura entre elas.

## 💻 Exemplo Prático
```go
package main
import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

## 🧠 Por que isso é importante?
- **Cloud Native**: A linguagem da nuvem (Docker e K8s são feitos em Go).
- **Simplicidade**: Poucas keywords, fácil de ler.
- **Concorrência**: Resolver problemas de escala com facilidade.

## 📚 Referências
- [A Tour of Go](https://go.dev/tour/welcome/1)
