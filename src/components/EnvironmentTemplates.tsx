import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Play, Copy, CheckCircle2, Package, Code2, Database, Globe, Cpu, Wrench } from "lucide-react";

interface EnvironmentTemplate {
  id: string;
  name: string;
  language: string;
  icon: string;
  description: string;
  features: string[];
  downloadSize: string;
  setupTime: string;
  preInstalledPackages: string[];
  sampleCode: string;
  color: string;
}

const environmentTemplates: EnvironmentTemplate[] = [
  {
    id: "python-colab",
    name: "Python Data Science",
    language: "Python",
    icon: "🐍",
    description: "Complete Python environment with NumPy, Pandas, Matplotlib, and Jupyter-style execution",
    features: ["Jupyter-style cells", "Data visualization", "Machine Learning ready", "GPU support"],
    downloadSize: "2.1 GB",
    setupTime: "< 3 minutes",
    preInstalledPackages: ["numpy", "pandas", "matplotlib", "scikit-learn", "tensorflow", "jupyter"],
    sampleCode: `# Python Data Science Environment
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Create sample data
data = np.random.randn(1000)
df = pd.DataFrame({'values': data})

# Quick visualization
plt.figure(figsize=(10, 6))
plt.hist(data, bins=30, alpha=0.7)
plt.title('Sample Data Distribution')
plt.show()

print("Environment ready! 🚀")`,
    color: "from-blue-500 to-green-500"
  },
  {
    id: "cpp-competitive",
    name: "C++ Competitive Programming",
    language: "C++",
    icon: "⚡",
    description: "Optimized C++ environment for competitive programming with fast compilation and debugging tools",
    features: ["Fast compilation", "Debugging tools", "STL libraries", "Performance profiling"],
    downloadSize: "850 MB",
    setupTime: "< 2 minutes",
    preInstalledPackages: ["g++", "gdb", "valgrind", "boost", "googletest"],
    sampleCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>

using namespace std;
using namespace std::chrono;

int main() {
    // Performance-optimized setup
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    vector<int> nums = {64, 34, 25, 12, 22, 11, 90};
    
    auto start = high_resolution_clock::now();
    sort(nums.begin(), nums.end());
    auto stop = high_resolution_clock::now();
    
    cout << "Sorted array: ";
    for(int num : nums) cout << num << " ";
    cout << endl;
    
    auto duration = duration_cast<microseconds>(stop - start);
    cout << "Sort time: " << duration.count() << " microseconds" << endl;
    
    return 0;
}`,
    color: "from-orange-500 to-red-500"
  },
  {
    id: "java-enterprise",
    name: "Java Enterprise Development",
    language: "Java",
    icon: "☕",
    description: "Full Java development environment with Spring Boot, Maven, and enterprise libraries",
    features: ["Spring Boot", "Maven integration", "JUnit testing", "Enterprise libraries"],
    downloadSize: "1.8 GB",
    setupTime: "< 4 minutes",
    preInstalledPackages: ["openjdk-17", "maven", "spring-boot", "junit5", "hibernate"],
    sampleCode: `// Java Enterprise Environment
import java.util.*;
import java.util.stream.Collectors;

public class EnterpriseDemo {
    public static void main(String[] args) {
        System.out.println("Java Enterprise Environment Ready! ☕");
        
        // Sample data processing
        List<String> languages = Arrays.asList(
            "Java", "Python", "C++", "JavaScript", "Rust", "Go"
        );
        
        // Stream API demonstration
        List<String> filtered = languages.stream()
            .filter(lang -> lang.length() > 4)
            .sorted()
            .collect(Collectors.toList());
            
        System.out.println("Languages with > 4 chars: " + filtered);
        
        // Enterprise-ready features available:
        System.out.println("✓ Spring Boot ready");
        System.out.println("✓ Maven configured");
        System.out.println("✓ JUnit testing enabled");
    }
}`,
    color: "from-red-500 to-orange-500"
  },
  {
    id: "javascript-fullstack",
    name: "JavaScript Full-Stack",
    language: "JavaScript",
    icon: "🟨",
    description: "Modern JavaScript environment with Node.js, React, and popular frameworks",
    features: ["Node.js runtime", "React/Vue ready", "Package management", "Modern ES features"],
    downloadSize: "1.2 GB",
    setupTime: "< 3 minutes",
    preInstalledPackages: ["node", "npm", "react", "express", "lodash", "axios"],
    sampleCode: `// JavaScript Full-Stack Environment
console.log("🚀 JavaScript Full-Stack Environment Ready!");

// Modern ES6+ features
const languages = ['JavaScript', 'TypeScript', 'Node.js'];
const frameworks = ['React', 'Vue', 'Express'];

// Destructuring and spread
const [...allTech] = [...languages, ...frameworks];

// Async/await ready
const fetchData = async () => {
    try {
        console.log('Simulating API call...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { status: 'success', data: allTech };
    } catch (error) {
        console.error('Error:', error);
    }
};

// Modern JavaScript execution
fetchData().then(result => {
    console.log('Available technologies:', result.data);
    console.log('✓ Node.js runtime active');
    console.log('✓ Modern ES features enabled');
    console.log('✓ Package ecosystem ready');
});`,
    color: "from-yellow-500 to-green-500"
  },
  {
    id: "rust-systems",
    name: "Rust Systems Programming",
    language: "Rust",
    icon: "🦀",
    description: "Rust environment optimized for systems programming with cargo and performance tools",
    features: ["Cargo package manager", "Performance profiling", "Memory safety", "Concurrent programming"],
    downloadSize: "1.5 GB",
    setupTime: "< 3 minutes",
    preInstalledPackages: ["rustc", "cargo", "clippy", "rustfmt", "tokio"],
    sampleCode: `// Rust Systems Programming Environment
use std::collections::HashMap;
use std::thread;
use std::time::Duration;

fn main() {
    println!("🦀 Rust Systems Programming Environment Ready!");
    
    // Memory-safe operations
    let mut data = HashMap::new();
    data.insert("language", "Rust");
    data.insert("paradigm", "Systems");
    data.insert("memory", "Safe");
    
    // Concurrent programming example
    let handles: Vec<_> = (0..3).map(|i| {
        thread::spawn(move || {
            thread::sleep(Duration::from_millis(100));
            println!("Thread {} completed safely", i);
        })
    }).collect();
    
    // Wait for all threads
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("✓ Memory safety guaranteed");
    println!("✓ Zero-cost abstractions");
    println!("✓ Cargo ecosystem ready");
    println!("Data: {:?}", data);
}`,
    color: "from-orange-600 to-red-600"
  },
  {
    id: "go-microservices",
    name: "Go Microservices",
    language: "Go",
    icon: "🐹",
    description: "Go environment configured for microservices development with networking and concurrency tools",
    features: ["Goroutines & channels", "HTTP frameworks", "Docker integration", "Cloud-native tools"],
    downloadSize: "900 MB",
    setupTime: "< 2 minutes",
    preInstalledPackages: ["go", "gin", "gorm", "docker", "kubernetes-client"],
    sampleCode: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    fmt.Println("🐹 Go Microservices Environment Ready!")
    
    // Goroutines demonstration
    var wg sync.WaitGroup
    
    services := []string{"auth", "api", "database", "cache"}
    
    for _, service := range services {
        wg.Add(1)
        go func(svc string) {
            defer wg.Done()
            fmt.Printf("✓ Microservice '%s' started\n", svc)
            time.Sleep(100 * time.Millisecond)
        }(service)
    }
    
    wg.Wait()
    
    fmt.Println("✓ Concurrent programming ready")
    fmt.Println("✓ HTTP frameworks available")
    fmt.Println("✓ Cloud-native tools configured")
    fmt.Println("All microservices running! 🚀")
}`,
    color: "from-cyan-500 to-blue-500"
  }
];

const EnvironmentTemplates = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(templateId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadEnvironment = (template: EnvironmentTemplate) => {
    // Create a downloadable configuration file
    const config = {
      name: template.name,
      language: template.language,
      packages: template.preInstalledPackages,
      sampleCode: template.sampleCode,
      features: template.features,
      version: "1.0.0",
      created: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-environment.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Pre-configured Development Environments
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Download and apply ready-to-use environments for each programming language. 
          Similar to Google Colab but supporting multiple languages with optimized setups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {environmentTemplates.map((template) => (
          <Card key={template.id} className="relative overflow-hidden group hover:border-primary/50 transition-smooth" data-test="environment-template">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-5 group-hover:opacity-10 transition-smooth`} />
            
            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {template.language}
                    </Badge>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
                      <Code2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span className="text-2xl">{template.icon}</span>
                        {template.name} Environment
                      </DialogTitle>
                      <DialogDescription>
                        {template.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Environment Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Package className="w-4 h-4" />
                            Download Size
                          </div>
                          <p className="text-2xl font-bold text-primary">{template.downloadSize}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Cpu className="w-4 h-4" />
                            Setup Time
                          </div>
                          <p className="text-2xl font-bold text-accent">{template.setupTime}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {template.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-3 h-3 text-accent" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pre-installed Packages */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Pre-installed Packages
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {template.preInstalledPackages.map((pkg, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pkg}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Sample Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Code2 className="w-4 h-4" />
                            Sample Code
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(template.sampleCode, template.id)}
                            className="gap-2"
                          >
                            {copiedCode === template.id ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-accent" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="code-editor p-3 text-xs overflow-x-auto">
                          <code>{template.sampleCode}</code>
                        </pre>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {template.description}
              </p>

              {/* Quick Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {template.downloadSize}
                </div>
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  {template.setupTime}
                </div>
              </div>

              {/* Features preview */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => downloadEnvironment(template)}
                  className="flex-1 gap-2"
                  variant="hero"
                  data-test="download-env"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Quick Start</DialogTitle>
                      <DialogDescription>
                        Preview the {template.name} environment
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="code-editor p-3">
                        <pre className="text-sm"><code>{template.sampleCode.split('\n').slice(0, 10).join('\n')}...</code></pre>
                      </div>
                      <Button 
                        onClick={() => downloadEnvironment(template)}
                        className="w-full gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Full Environment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Access Section */}
      <Card className="p-6 gradient-secondary border-border/50">
        <div className="text-center space-y-4">
          <div className="gradient-ai rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Globe className="w-8 h-8 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-semibold">Cloud-Ready Environments</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Each environment is pre-configured for cloud execution with optimized dependencies, 
            just like Google Colab but for multiple programming languages.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Zero setup time
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Pre-installed libraries
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Cloud execution ready
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnvironmentTemplates;