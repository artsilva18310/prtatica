import { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Home (Hooks)</Text>
      <Text>Contagem: {count}</Text>
      <Button title="Somar +1" onPress={() => setCount((c) => c + 1)} />

      <Link href="/segunda" asChild>
        <TouchableOpacity style={{ marginTop: 16, backgroundColor: "#007bff", padding: 10, borderRadius: 6 }}>
          <Text style={{ color: "#fff" }}>Ir para a 2ª tela</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}